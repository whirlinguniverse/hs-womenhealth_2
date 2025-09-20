const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// 啟用CORS
app.use(cors({
    origin: '*', // 允許所有域名，生產環境建議指定具體域名
    methods: ['GET', 'POST']
}));

app.use(express.json());

// 代理mainpi.com的API請求
app.get('/api/calling/:callerId', async (req, res) => {
    const { callerId } = req.params;

    try {
        console.log(`代理請求 - Caller ID: ${callerId}`);

        // 請求mainpi.com的頁面
        const response = await fetch(`https://www.mainpi.com/query?i=${callerId}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP錯誤: ${response.status}`);
        }

        const htmlContent = await response.text();

        // 解析HTML中的叫號數據
        const callingData = parseCallingData(htmlContent);

        res.json({
            success: true,
            timestamp: new Date().toLocaleTimeString('zh-TW'),
            data: callingData
        });

    } catch (error) {
        console.error('代理請求失敗:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toLocaleTimeString('zh-TW')
        });
    }
});

// 解析叫號數據的函數
function parseCallingData(htmlContent) {
    try {
        // 使用正則表達式提取JavaScript中的數據
        const callNumsMatch = htmlContent.match(/call_nums['"]\s*:\s*['"]([^'"]*)['"]/);
        const ticketNumsMatch = htmlContent.match(/ticket_nums['"]\s*:\s*['"]([^'"]*)['"]/);

        let callNums = [];
        let ticketNums = [];

        if (callNumsMatch && callNumsMatch[1]) {
            try {
                callNums = JSON.parse(callNumsMatch[1] || '[]');
            } catch (e) {
                callNums = callNumsMatch[1].split(',').map(n => parseInt(n.trim()) || 0);
            }
        }

        if (ticketNumsMatch && ticketNumsMatch[1]) {
            try {
                ticketNums = JSON.parse(ticketNumsMatch[1] || '[]');
            } catch (e) {
                ticketNums = ticketNumsMatch[1].split(',').map(n => parseInt(n.trim()) || 0);
            }
        }

        return {
            queues: {
                1: {
                    current: callNums[0] || 0,
                    waiting: ticketNums[0] || 0,
                    active: callNums[0] > 0
                },
                2: {
                    current: callNums[1] || 0,
                    waiting: ticketNums[1] || 0,
                    active: callNums[1] > 0
                }
            }
        };

    } catch (error) {
        console.error('解析數據失敗:', error);
        return {
            queues: {
                1: { current: 0, waiting: 0, active: false },
                2: { current: 0, waiting: 0, active: false }
            },
            error: true
        };
    }
}

// 健康檢查端點
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'MainPI Proxy Server'
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 代理服務器運行在 http://localhost:${PORT}`);
    console.log(`📡 API端點: http://localhost:${PORT}/api/calling/1028`);
    console.log(`💊 健康檢查: http://localhost:${PORT}/health`);
});

module.exports = app;