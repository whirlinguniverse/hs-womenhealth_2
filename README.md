# 新營惠生婦產科官方網站

## 🏥 關於

新營惠生婦產科診所的官方網站，提供診所資訊、醫師介紹、門診時間、即時叫號系統等功能。

## ✨ 功能特色

- 📱 響應式設計，支援電腦和手機瀏覽
- 👨‍⚕️ 醫師專業資歷介紹
- 🕐 詳細門診時間與輪診公告
- 📡 即時叫號系統整合
- 🔊 叫號提醒音效
- 🗺️ Google Maps 地圖定位
- ⭐ 患者評價展示
- 🔍 SEO 優化，提高搜尋排名

## 🚀 叫號系統 API

### 方案1: 本地開發測試

```bash
# 安裝依賴
npm install

# 啟動代理服務器
npm start

# 開發模式（自動重啟）
npm run dev
```

代理服務器將運行在 `http://localhost:3001`

### 方案2: 部署到 Vercel

1. **Fork 此專案到你的 GitHub**
2. **連接到 Vercel**：
   - 訪問 [vercel.com](https://vercel.com)
   - 連接你的 GitHub 帳號
   - 選擇此專案進行部署
3. **自動部署**：Vercel 會自動檢測配置並部署

### 方案3: 部署到其他雲端服務

#### Netlify
```bash
npm run build
# 上傳 dist 資料夾到 Netlify
```

#### Railway
```bash
railway login
railway init
railway up
```

#### Heroku
```bash
heroku create your-app-name
git push heroku main
```

## 🔧 API 端點

- `GET /api/calling/:callerId` - 獲取叫號狀態
- `GET /health` - 健康檢查

### 使用範例

```javascript
// 獲取惠生婦產科叫號狀態
fetch('/api/calling/1028')
  .then(response => response.json())
  .then(data => {
    console.log('叫號數據:', data);
  });
```

## 🛠️ 本地開發

1. **複製專案**
```bash
git clone https://github.com/whirlinguniverse/hs-womenhealth_2.git
cd hs-womenhealth_2
```

2. **安裝依賴**
```bash
npm install
```

3. **啟動開發服務器**
```bash
npm run dev
```

4. **開啟瀏覽器**
訪問 `http://localhost:3001` 查看網站
訪問 `http://localhost:3001/api/calling/1028` 測試 API

## 📝 CORS 解決方案

### 問題
mainpi.com 的 API 有 CORS 跨域限制，瀏覽器會阻止直接調用。

### 解決方案

1. **使用代理服務器**（推薦）
   - 本專案已包含 Node.js 代理服務器
   - 自動處理 CORS 問題
   - 支援多種部署平台

2. **聯繫 mainpi.com**
   - 請求將你的域名加入 CORS 白名單
   - 聯繫方式：透過官方網站

3. **測試模式**
   - 點擊 🧪 測試模式按鈕
   - 查看模擬的叫號系統效果

## 🌐 域名設定

### 自定義域名
如果你有自己的域名，可以：

1. **設定 DNS**：將域名指向部署服務的 IP
2. **SSL 憑證**：大多數雲端服務會自動提供
3. **更新配置**：修改 `callingData.proxyUrl` 設定

### 建議域名
- `惠生婦產科.tw`
- `hs-clinic.com`
- `hs-womenhealth.com`

## 📊 SEO 優化

已包含的 SEO 功能：
- Meta 標籤優化
- 結構化數據標記
- 本地商家 Schema
- 圖片 alt 標籤
- sitemap.xml
- robots.txt

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改善此專案。

## 📄 授權

MIT License - 詳見 LICENSE 文件

## 📞 聯絡資訊

**新營惠生婦產科診所**
- 📍 地址：730 台南市新營區三民路72-1號
- 📞 電話：06-6331230
- 🌐 網站：https://hs-womenhealth-2.vercel.app/

---

🤖 Generated with [Claude Code](https://claude.ai/code)