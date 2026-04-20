# PostgreSQL Setup Guide for Windows

## Step 1: Download PostgreSQL Installer

1. Go to https://www.postgresql.org/download/windows/
2. Click on "Download the installer" for the latest version (15 or 16)
3. Download the Windows installer

## Step 2: Run the Installer
##password - postgres
1. Double-click the downloaded `.exe` file
2. Click "Next" through the setup wizard
3. **Important**: When asked for a password, set it to `postgres` (or remember what you set)
4. Keep the port as `5432` (default)
5. Complete the installation

## Step 3: Verify Installation

After installation, open PowerShell and run:

```powershell
psql --version
```

You should see something like: `psql (PostgreSQL) 15.x`

## Step 4: Create the Database

Open PowerShell as Administrator and run:

```powershell
psql -U postgres
```

If prompted for password, enter the password you set during installation (default is `postgres`).

Then run these SQL commands:

```sql
CREATE DATABASE ecommerce_admin;
\q
```

## Step 5: Update .env File

If you used a different password than `postgres`, update the `.env` file:

```env
DB_PASSWORD=your_password_here
```

## Step 6: Restart the Server

Once database is created, go back to the project folder and run:

```powershell
npm run dev
```

## Troubleshooting

- If password authentication fails, check your .env file matches your PostgreSQL password
- If port 5432 is in use, change `DB_PORT` in .env
- If database doesn't exist, create it using the SQL command above

---

Once PostgreSQL is installed and the database is created, let me know and I'll start the server.
