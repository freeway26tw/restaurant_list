# 我的餐廳清單

![Index page about Restaurant List](./public/image/snapshot_sort.png)

## 介紹

紀錄屬於自己的餐廳清單，可以瀏覽餐廳、查看詳細資訊、甚至連結到地圖。

### 功能

使用者需要先登入，才能使用餐廳清單的功能
* 自行創建帳號後登入
* Facebook登入
* Google登入

使用者可以在首頁看到所有餐廳與它們的簡單資料：
* 餐廳照片
* 餐廳名稱
* 餐廳分類
* 餐廳評分

使用者可以再點進去看餐廳的詳細資訊：
* 類別
* 地址
* 電話
* 描述
* 圖片

使用者可以透過**下拉選單**來排序搜尋餐廳清單
![Dropdown list in search bar](./public/image/dropdown_sort.png)

使用者可以透過搜尋**餐廳名稱**或是**餐廳類別**來找到特定的餐廳，除了手動搜尋外，也在搜尋框中，可以使用下拉式選單選取餐廳
![Dropdown list in search bar](./public/image/search_dropdown_list.png)

在餐廳詳細資訊中，使用者可以點擊**餐廳類別**，來查看所有相同類別的餐廳
![Where to click the category](./public/image/restaurant_detail_category.png)

針對餐廳資訊，使用者可以:
* 新增餐廳
* 編輯餐廳
* 刪除餐廳

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 在終端機輸入以下指令，將專案 clone 到本地
   ```bash
   git clone https://github.com/freeway26tw/restaurant_list.git
   ```
   
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```

   ps. 此時終端機上可能會出現「​​ high severity vulnerability 」的提示
   這是因為 3.0.0 並不是 express-handlebars 當前最新版本
   但此訊息不影響此專案的運作，因此可先忽略

4. 新增.env檔案，存放 MONGODB_URI=mongoDB+srv://[使用者帳號:使用者密碼]@[資料庫伺服器位置]/[資料庫名稱]
   **詳細填寫資料，請參照.env.example**

5. 使用種子資料:
   ```bash
   npm run seed
   ```

6. 安裝完畢後，繼續輸入：

   ```bash
   npm run dev
   ```

7. 若看見此行訊息則代表順利運行

   ```bash
   Express is listening on http://localhost:3000
   ```

8. 打開瀏覽器進入到以下網址，即可連到網頁
   ```
   http://localhost:3000/
   ```


9. 若欲暫停使用，可回到終端機輸入

   ```bash
   ctrl + c
   ```

## 開發工具

- bcryptjs: 2.4.3
- body-parser: 1.20.1
- connect-flash: 0.1.1
- express: 4.16.4
- express-handlebars: 3.0.0
- express-session: 1.17.1
- express-validator: 6.14.3
- method-override: 3.0.0
- mongoose: 5.9.7
- passport: 0.4.1
- passport-facebook: 3.0.0
- passport-google-oauth20: 2.0.0
- passport-local: 1.0.0