# 🔄 User Data Sync Platform (DataEntry)

- data sync case study.docx - application overview and detail

---

A distributed microservices-based application that **syncs user profile updates** across two systems (Website A and Website B) using **Kafka**, **AVRO serialization**, and **.NET Core microservices**. Designed with clean architecture, proper validations, and a focus on enterprise-grade data consistency using **SQL Server**.

---

## 🚀 Key Features

### 👤 User Operations
- Users can update personal and profile details (Name, Admission Year, Practice Area, etc.)
- Dependent details like DOB are editable and pre-filled
- Fields are validated against strict business rules

### 🔁 Data Sync
- Profile updates are propagated between Website A and Website B
- Kafka + AVRO used for **event-driven message-based sync**
- Centralized log, error handling, and validation

---

## 🧩 Tech Stack

| Layer        | Technology Used                                       |
|--------------|--------------------------------------------------------|
| Frontend     | Angular, Bootstrap, TypeScript                 |
| Backend      | .NET Core Web API (REST), Kafka, AVRO                  |
| Database     | **SQL Server** (normalized tables for Member & Dependents) |
| Messaging    | Kafka Broker with AVRO serialization                   |
| DevOps       | Docker, Docker Compose, Swagger (OpenAPI), CI/CD       |
| Testing      | NUnit, Karma, Jasmine                         |
| Cloud-ready  | Azure        |

---

## 📖 Functional Use Cases & Endpoints

| User Story | Description                         | Sample Endpoint                             | Method |
|------------|-------------------------------------|----------------------------------------------|--------|
| `US_01`    | Kafka Message Bus Setup             | `POST /kafka/publish`                        | POST   |
| `US_02`    | Auth & Profile Save APIs            | `POST /api/profile`                          | POST   |
|            |                                     | `PUT /api/profile/{id}`                      | PUT    |
| `US_03`    | Fetch/Update Member Info via UI     | `GET /api/member?name=John`                 | GET    |

---

## 🧾 Business Rules & Validation

- Name: 5–35 characters
- Practice Area: Max 100 characters
- Date of Admission: Between 1950 and current year
- Year of Birth: At least 21 years earlier than admission
- PAN: No special characters
- Email: Valid format
- Required fields return `400 Bad Request` with descriptive error
- Server/database failures return `500 Internal Server Error`

---

## 🗃 SQL Server Schema Overview

**Table: `MemberProfile`**
| Column           | Type        | Notes                         |
|------------------|-------------|-------------------------------|
| MemberID         | INT (PK)    | Auto-generated                |
| FirstName        | NVARCHAR(50)| Required                      |
| LastName         | NVARCHAR(50)| Required                      |
| Email            | NVARCHAR(100)| Unique, Required             |
| AdmissionDate    | DATE        | Validated                     |
| PracticeArea     | NVARCHAR(100)| Required                      |
| PracticeLocation | NVARCHAR(100)| Optional                      |

**Table: `DependentDetails`**
| Column        | Type         | Notes                          |
|---------------|--------------|--------------------------------|
| DependentID   | INT (PK)     | Auto-generated                 |
| MemberID      | INT (FK)     | Foreign key to MemberProfile   |
| DependentName | NVARCHAR(50) | Required                       |
| DOB           | DATE         | Editable                       |

---

## 💬 Kafka Messaging Flow

- Kafka topics used for: `member-updated`, `sync-status`
- Message schema: **AVRO**-typed payload with strict validation
- Kafka consumers on both Website A & B listen to member update messages
- All messages logged centrally with timestamps

---

## 🧪 Testing

- **Backend**:
  - NUnit Unit tests for services and controller layers
  - Swagger for API documentation
  - Exception handling verified using integration tests
- **Frontend**:
  - Angular reactive form validation tests
  - Karma and Jasmine tests for component behavior

---


---

## ⚙️ Run Locally

- Start SQL Server locally (or use Azure SQL)
- Run SQL script in sql/schema.sql

Backend:
```bash
dotnet run --project MemberService
```

Frontend:
```bash
cd frontend/angular-app
npm install
ng serve
```

- Access frontend: http://localhost:4200
- Backend API: http://localhost:8080/api
- Kafka broker: localhost:9092

