# Database Design & Data Flow - ez-com

ไฟล์นี้แสดงโครงสร้างฐานข้อมูล (ER Diagram) และขั้นตอนการไหลของข้อมูล (Data Flow) ระหว่างหน้าบ้านและหลังบ้าน (Supabase)

---

## 1. Database Schema (ER Diagram)
แผนผังโครงสร้างของ Supabase Tables และความสัมพันธ์ของข้อมูล

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    PRODUCTS ||--o{ ORDER_ITEMS : included_in
    ORDERS ||--|{ ORDER_ITEMS : contains

    USERS {
        uuid id PK "Supabase Auth ID"
        string email
        string display_name
        string role "admin | user"
        string phone_number
        timestamp created_at
    }

    PRODUCTS {
        uuid id PK
        string name
        string description
        number price
        number quantity "Stock"
        string image_url
        string category
        string status "open | close"
        timestamp updated_at
    }

    ORDERS {
        uuid id PK
        string order_number "AAXXXXXX"
        uuid user_id FK
        number total_price
        string status "pending | paid | shipping | completed"
        string shipping_address
        string payment_method
        timestamp created_at
    }

    ORDER_ITEMS {
        uuid product_id FK
        string name
        number price
        number quantity
    }
```

---

## 2. Data Flow (Frontend to Backend)
ขั้นตอนการส่งข้อมูลเมื่อมีการสั่งซื้อสินค้า

```mermaid
sequenceDiagram
    participant User as ลูกค้า (Browser)
    participant Store as Pinia Store (Cart)
    participant Auth as Supabase Auth
    participant DB as Supabase Database

    User->>Store: กดปุ่ม Checkout
    Store->>Auth: ตรวจสอบสถานะการ Login (userId)
    
    alt ไม่ได้ Login
        Auth-->>User: ให้ไปหน้า Login
    else Login แล้ว
        Store->>DB: สร้าง Row ใหม่ในโต๊ะ 'orders'
        Note over Store, DB: ส่งข้อมูล Order + รายการสินค้า
        DB-->>Store: ยืนยันการบันทึก (Success)
        Store->>DB: อัปเดตสต็อกสินค้า (Products Table)
        Note over Store, DB: ลดจำนวน quantity ของสินค้าที่ถูกซื้อ
        Store->>Store: เคลียร์สินค้าในตะกร้า (Clear Cart)
        Store-->>User: แสดงหน้า SuccessView
    end
```

---

## 3. Admin Flow (Management)
ขั้นตอนการจัดการสินค้าของ Admin

```mermaid
graph LR
    Admin[Admin Panel] -->|Add/Edit| Products[(Supabase: Products)]
    Admin -->|View/Update Status| Orders[(Supabase: Orders)]
    Admin -->|Manage| Users[(Supabase: Users)]
```

---

### วิธีการดูไฟล์นี้ให้เห็นเป็นรูปภาพ:
1. หากคุณใช้ **VS Code**: ให้กดปุ่ม `Ctrl + Shift + V` เพื่อเปิด Preview ของ Markdown
2. คุณจะเห็นแผนผังแบบ Visual ที่สวยงามครับ
