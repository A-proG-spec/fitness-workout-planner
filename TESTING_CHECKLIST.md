# HulFit Testing Checklist

## ✅ Authentication Flow

### Registration
- [ ] Navigate to `/register`
- [ ] Fill in name, email, password
- [ ] Check terms checkbox
- [ ] Click "Create Account"
- [ ] Should redirect to `/onboarding/1`
- [ ] Check MongoDB Atlas - user should be created

### Onboarding
- [ ] Complete Step 1 (Body Metrics) - enter age, height, weight, gender
- [ ] Complete Step 2 (Goals) - select fitness goal
- [ ] Complete Step 3 (Summary) - verify data is correct
- [ ] Click "Go to Dashboard"
- [ ] Should redirect to `/dashboard`
- [ ] Check MongoDB - user should have `onboardingCompleted: true`

### Login
- [ ] Navigate to `/login`
- [ ] Enter registered email and password
- [ ] Click "Sign In"
- [ ] Should redirect to `/dashboard` (if onboarding completed)
- [ ] Should redirect to `/onboarding/1` (if onboarding not completed)

### Logout
- [ ] Click "Sign Out" in sidebar
- [ ] Should redirect to `/login`
- [ ] Try accessing `/dashboard` - should redirect to `/login`

## ✅ Protected Routes

- [ ] Without login, try accessing `/dashboard` - should redirect to `/login`
- [ ] Without login, try accessing `/profile` - should redirect to `/login`
- [ ] Without login, try accessing `/progress` - should redirect to `/login`
- [ ] Without login, try accessing `/exercises` - should redirect to `/login`
- [ ] After login, all protected routes should be accessible

## ✅ Dashboard Page

- [ ] User's first name appears in welcome message
- [ ] User initials appear in navbar avatar
- [ ] All stat cards display correctly
- [ ] Charts render properly
- [ ] "Today's Workouts" section displays
- [ ] "Recent Activity" section displays
- [ ] Quick actions work (Browse Workouts, Log Progress)

## ✅ Profile Page

- [ ] User's full name displays correctly
- [ ] User initials in avatar
- [ ] Member since date is correct
- [ ] Weight, Height, and Goal display correctly
- [ ] Can update profile information
- [ ] Click "Save All Changes" - should show success message
- [ ] Refresh page - updated data should persist

## ✅ Progress Page

- [ ] User initials in navbar
- [ ] Charts display correctly
- [ ] Stats show properly
- [ ] Navigation works

## ✅ Community Page

- [ ] Page loads without errors
- [ ] Feed, Leaderboard, Challenges tabs work
- [ ] User initials in navbar

## ✅ Exercise Library

- [ ] Exercise cards display
- [ ] Hover effects work
- [ ] Click "View Details" - should navigate to exercise detail page
- [ ] Exercise detail page shows full information

## ✅ BMI Calculator

- [ ] Can switch between metric and imperial
- [ ] Enter height and weight
- [ ] BMI calculates correctly
- [ ] BMI category displays

## ✅ Session Management

- [ ] Login persists after page refresh
- [ ] User data persists in localStorage
- [ ] Logout clears session
- [ ] Token expires after 7 days (JWT_EXPIRE)

## ✅ Error Handling

- [ ] Invalid login credentials show error
- [ ] Duplicate email registration shows error
- [ ] Network errors are handled gracefully
- [ ] 401 errors redirect to login

## ✅ Backend API

- [ ] `GET /api/health` - returns server status
- [ ] `POST /api/auth/register` - creates user
- [ ] `POST /api/auth/login` - returns user and token
- [ ] `POST /api/auth/logout` - clears cookie
- [ ] `GET /api/auth/me` - returns current user
- [ ] `GET /api/profile` - returns user profile
- [ ] `PUT /api/profile` - updates user profile
- [ ] MongoDB Atlas connection is stable

## 🐛 Known Issues to Check

- [ ] Backend doesn't crash on file changes
- [ ] MongoDB connection doesn't timeout
- [ ] CORS allows frontend origin
- [ ] Cookies are sent with requests
- [ ] User data updates in real-time

## 📱 Responsive Design

- [ ] Test on mobile viewport
- [ ] Test on tablet viewport
- [ ] Test on desktop viewport
- [ ] Sidebar collapses on mobile
- [ ] All forms are usable on mobile

## 🔒 Security

- [ ] Passwords are hashed in database
- [ ] JWT tokens are httpOnly cookies
- [ ] Protected routes require authentication
- [ ] User can only access their own data
- [ ] No sensitive data in localStorage (only user object, no password)
