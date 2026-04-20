# Project Plan (Deadline: Tomorrow 12:00 PM)

This plan is designed for fast and complete assignment delivery within the deadline.

## Objective

Build a secure role-based eCommerce admin dashboard using:

- Node.js + Express
- Sequelize + PostgreSQL
- AdminJS
- bcrypt + JWT
- Custom Dashboard and Settings pages

No Bootstrap required.

## Delivery Strategy

- Prioritize backend correctness and access control first.
- Build only what is required by assignment.
- Keep code simple, readable, and demo-friendly.
- Commit in small logical steps.

## Time-Box Plan

## Phase 1: Setup (60-90 min)

- Initialize project and install dependencies
- Configure Express app and DB connection
- Add env configuration and base middleware

Output:

- App boots successfully
- PostgreSQL connection works

## Phase 2: Models + Relations (90-120 min)

Create models:

- User
- Category
- Product
- Order
- OrderItem
- Setting

Define associations:

- Category -> Product (1:N)
- Order -> OrderItem (1:N)
- Product -> OrderItem (1:N)
- User -> Order (1:N) (recommended)

Output:

- Migrations run successfully
- Tables created with correct foreign keys

## Phase 3: Auth (60-90 min)

- Implement `POST /api/login`
- Hash passwords with bcrypt
- Generate JWT on successful login
- Add auth middleware for protected routes/AdminJS

Output:

- Login works for valid credentials
- Unauthorized access is blocked

## Phase 4: AdminJS Integration (90-120 min)

- Register all models as resources
- Hide password in all resource views
- Configure relation fields display
- Protect AdminJS with authenticated session/token flow

Output:

- Admin panel opens only after authentication
- Resources visible and usable

## Phase 5: RBAC + Custom Pages (90-120 min)

Implement role behavior:

- Admin:
  - full resource access
  - full dashboard stats
  - settings page access

- Regular user:
  - cannot see Users and Settings resources
  - limited dashboard view

Use AdminJS options:

- `isVisible`
- `isAccessible`

Output:

- Role restrictions fully working

## Phase 6: Testing + Docs + Final Push (60-90 min)

- Manual test all critical flows
- Fix edge-case errors
- Finalize README and plan docs
- Push clean branch history

Output:

- Public GitHub repository ready for submission

## Task Checklist

- [ ] Project initialized
- [ ] PostgreSQL connected
- [ ] Sequelize configured
- [ ] All models created
- [ ] Migrations + seeders complete
- [ ] Login endpoint implemented
- [ ] bcrypt hashing working
- [ ] JWT generation/verification working
- [ ] AdminJS integrated
- [ ] Password hidden in admin views
- [ ] RBAC rules enforced
- [ ] Dashboard page created
- [ ] Settings page created
- [ ] README completed
- [ ] Public GitHub repo updated

## Risk Control

If time gets short, prioritize in this order:

1. Authentication and protected AdminJS access
2. RBAC (admin vs regular restrictions)
3. Required resources and model relations
4. Custom pages (basic but functional)
5. UI polish

## Commit Plan

Use these commit chunks:

1. `chore: initialize express and sequelize setup`
2. `feat: add ecommerce models and associations`
3. `feat: implement login with bcrypt and jwt`
4. `feat: integrate adminjs with protected access`
5. `feat: add role-based resource visibility`
6. `feat: add custom dashboard and settings pages`
7. `docs: add setup guide and submission notes`

## Demo Script (for Interview)

1. Run app and open AdminJS
2. Login as admin and show all resources
3. Open dashboard and settings as admin
4. Login as regular user
5. Show hidden Users/Settings and limited dashboard
6. Show secure login endpoint behavior

## Definition of Done

- All assignment requirements implemented
- Security basics in place (bcrypt, JWT, protected admin)
- Role-based visibility and access control work correctly
- README allows reviewer to run project quickly
- Code is pushed to public GitHub repo before deadline
