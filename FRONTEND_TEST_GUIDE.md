# 🧪 Frontend Voice Recording Test Cases

## Test Setup Instructions

### Step 1: Create Test User Accounts
First, sign up these 4 test users on the frontend:

---

## 👥 Test User Accounts

### **User 1: Emergency Patient (HIGH Priority - Score 9+)**
```
Name: Emma Critical
Email: emma.critical@test.com
Password: Emergency123!
```

### **User 2: Urgent Patient (MEDIUM Priority - Score 5-6)**
```
Name: David Moderate
Email: david.moderate@test.com
Password: Moderate123!
```

### **User 3: Mild Patient (LOW Priority - Score 2-3)**
```
Name: Sophie Mild
Email: sophie.mild@test.com
Password: MildCase123!
```

### **User 4: General Inquiry (LOWEST Priority - Score 0-1)**
```
Name: Robert Wellness
Email: robert.wellness@test.com
Password: Wellness123!
```

---

## 🎙️ Voice Recording Test Scripts

### **Test 1: Emma Critical (Expected: HIGH - Rank 1, Score 9+)**

**Login as:** emma.critical@test.com  
**Password:** Emergency123!

**Go to:** Home Page → Voice Recorder Section

**Speak/Type this transcript:**
```
I'm having severe chest pain right now and I can't breathe properly. 
The pain is crushing and radiating down my left arm. 
I feel dizzy and nauseous. 
I think I'm having a heart attack. 
Please help me immediately! 
This is an emergency!
```

**Expected AI Result:**
- ✅ Urgency Score: **9-10/10**
- ✅ Priority Rank: **1 (HIGH)**
- ✅ Severity: **critical** or **high**
- ✅ Detected Symptoms: chest pain, heart attack, breathing difficulty
- ✅ Recommendation: "CALL 911 IMMEDIATELY"
- ✅ Confidence: 70-90%

---

### **Test 2: David Moderate (Expected: MEDIUM - Rank 2, Score 5-6)**

**Login as:** david.moderate@test.com  
**Password:** Moderate123!

**Go to:** Home Page → Voice Recorder Section

**Speak/Type this transcript:**
```
I've been having a bad headache for the past three days. 
I also have a fever around 101 degrees and body aches. 
I'm feeling weak and tired all the time. 
My throat is sore and I have a persistent cough. 
Should I see a doctor soon?
```

**Expected AI Result:**
- ✅ Urgency Score: **5-6/10**
- ✅ Priority Rank: **2 (MEDIUM)**
- ✅ Severity: **medium**
- ✅ Detected Symptoms: fever, pain, cough, headache
- ✅ Recommendation: "Schedule medical consultation soon - Contact your doctor within 24-48 hours"
- ✅ Confidence: 50-70%

---

### **Test 3: Sophie Mild (Expected: LOW - Rank 2-3, Score 2-3)**

**Login as:** sophie.mild@test.com  
**Password:** MildCase123!

**Go to:** Home Page → Voice Recorder Section

**Speak/Type this transcript:**
```
I have a slight headache today and my nose is a bit stuffy. 
I think I might be catching a cold. 
My throat feels a little scratchy. 
No fever or anything serious. 
Just feeling a bit under the weather.
```



**Expected AI Result:**
- ✅ Urgency Score: **2-4/10**
- ✅ Priority Rank: **3 (LOW)** or **2 (MEDIUM)**
- ✅ Severity: **low** or **medium**
- ✅ Detected Symptoms: headache, pain
- ✅ Recommendation: "Monitor symptoms - Schedule routine appointment if symptoms persist"
- ✅ Confidence: 50-65%

---

### **Test 4: Robert Wellness (Expected: LOWEST - Rank 3, Score 0-1)**

**Login as:** robert.wellness@test.com  
**Password:** Wellness123!

**Go to:** Home Page → Voice Recorder Section

**Speak/Type this transcript:**
```
Hi doctor, I just wanted to ask about vitamin supplements. 
I'm thinking about starting a new exercise routine. 
Can you recommend any good multivitamins? 
Also, what's a healthy diet for someone in their thirties? 
No health issues, just looking for general wellness advice.
```

**Expected AI Result:**
- ✅ Urgency Score: **0-1/10**
- ✅ Priority Rank: **3 (LOW)**
- ✅ Severity: **minimal** or **low**
- ✅ Detected Symptoms: None
- ✅ Recommendation: "General health inquiry - No immediate medical attention required"
- ✅ Confidence: 90-99% (AI very confident it's not urgent!)

# 🎯 Quick Test Reference Card

## 📝 Copy-Paste Test Accounts

### Test 1: HIGH PRIORITY (Score 9+)
```
Name: Emma Critical
Email: emma.critical@test.com
Password: Emergency123!

Transcript to speak:
"I'm having severe chest pain right now and I can't breathe properly. The pain is crushing and radiating down my left arm. I feel dizzy and nauseous. I think I'm having a heart attack. Please help me immediately! This is an emergency!"
```

### Test 2: MEDIUM PRIORITY (Score 5-6)
```
Name: David Moderate
Email: david.moderate@test.com
Password: Moderate123!

Transcript to speak:
"I've been having a bad headache for the past three days. I also have a fever around 101 degrees and body aches. I'm feeling weak and tired all the time. My throat is sore and I have a persistent cough. Should I see a doctor soon?"
```

### Test 3: LOW PRIORITY (Score 2-3)
```
Name: Sophie Mild
Email: sophie.mild@test.com
Password: MildCase123!

Transcript to speak:
"I have a slight headache today and my nose is a bit stuffy. I think I might be catching a cold. My throat feels a little scratchy. No fever or anything serious. Just feeling a bit under the weather."
```

### Test 4: MINIMAL PRIORITY (Score 0-1)
```
Name: Robert Wellness
Email: robert.wellness@test.com
Password: Wellness123!

Transcript to speak:
"Hi doctor, I just wanted to ask about vitamin supplements. I'm thinking about starting a new exercise routine. Can you recommend any good multivitamins? Also, what's a healthy diet for someone in their thirties? No health issues, just looking for general wellness advice."
```

---




## 🎨 What to Look For

**Admin Panel:**
- Stats cards showing patient counts
- Green banner "NEW DATA MODE"
- Purple badge "AI Analysis Active"
- Color-coded rows (red → yellow → green)
- AI confidence percentages
- Detected symptoms as badges
- Medical recommendations



## 🚀 Start Testing Now!

Copy Emma's credentials, sign up, and record her emergency scenario first! 🎉


---

## 📋 Step-by-Step Testing Process

### **For Each Test User:**

1. **Sign Up** (if not already registered)
   - Go to: http://localhost:5173/signup
   - Enter name, email, password
   - Click "Sign Up"

2. **Login**
   - Go to: http://localhost:5173/login
   - Enter email and password
   - Click "Login"

3. **Record Voice**
   - Go to Home page (should redirect automatically)
   - Scroll to "Voice Recorder" section
   - Click "🎤 Start Recording" button
   - Speak the test transcript (or type if using text input)
   - Click "⏹️ Stop Recording"
   - Wait for transcription

4. **Upload**
   - Review the transcript
   - Click "📤 Upload" button
   - Wait for success message

5. **Logout**
   - Click Logout
   - Ready for next test user

---

## 🔐 Admin Verification

### **After Recording All 4 Test Cases:**

1. **Login as Admin**
   ```
   Email: kbr1@gmail.com (or lk5@gmail.com or kiran@gmail.com)
   Password: (your admin password)
   ```

2. **Go to Admin Dashboard**
   - Click "Prioritize Patients" button

3. **Verify Results**
   You should see the patients in this order:

   | Rank | Patient Name | Score | Priority | Severity |
   |------|--------------|-------|----------|----------|
   | 1 | Emma Critical | 9-10 | HIGH | critical/high |
   | 2 | David Moderate | 5-6 | MEDIUM | medium |
   | 3 | Sophie Mild | 2-4 | LOW/MEDIUM | low/medium |
   | 4 | Robert Wellness | 0-1 | LOW | minimal |

4. **Click "View Details"**
   - Check AI confidence scores
   - Verify detected symptoms
   - Read medical recommendations

---

## ✅ Success Criteria

### **Emma Critical (Emergency):**
- ✅ Should be **Rank #1** (top of list)
- ✅ Red background row
- ✅ Score above 8.5
- ✅ "CALL 911 IMMEDIATELY" recommendation

### **David Moderate:**
- ✅ Should be **Rank #2 or #3**
- ✅ Yellow background row
- ✅ Score between 4-7
- ✅ "Contact doctor within 24-48 hours" recommendation

### **Sophie Mild:**
- ✅ Should be **Rank #3 or #4**
- ✅ Green or Yellow background
- ✅ Score between 2-4
- ✅ "Monitor symptoms" recommendation

### **Robert Wellness:**
- ✅ Should be **Last rank**
- ✅ Green background row
- ✅ Score below 2
- ✅ "No immediate attention required" recommendation
- ✅ High AI confidence (90%+)
---


const testCases = [
  {
    name: "John Emergency",
    email: "john.emergency@test.com",
    transcript: "I am having severe chest pain and crushing pressure in my chest. I can't breathe properly and my left arm is numb. I think I'm having a heart attack. Please help me immediately!",
    expectedPriority: "HIGH - Critical Emergency"
  },
  {
    name: "Sarah Urgent",
    email: "sarah.urgent@test.com", 
    transcript: "I fell down the stairs and hit my head really hard. I have a terrible headache and feel dizzy. There's a big bump on my head and I vomited once. I'm really worried about a concussion.",
    expectedPriority: "HIGH - Serious Injury"
  },
  {
    name: "Mike Moderate",
    email: "mike.moderate@test.com",
    transcript: "I've had a high fever for two days now, around 102 degrees. I also have body aches, severe cough, and chills. I'm feeling weak and tired all the time. Should I see a doctor soon?",
    expectedPriority: "MEDIUM - Medical Consultation Needed"
  },
  {
    name: "Lisa Mild",
    email: "lisa.mild@test.com",
    transcript: "I have a mild headache and a slightly sore throat. It started this morning. No fever or anything serious, just feeling a bit under the weather. Maybe I need some rest.",
    expectedPriority: "LOW - Mild Symptoms"
  },
  {
    name: "Tom General",
    email: "tom.general@test.com",
    transcript: "Hi doctor, I just wanted to ask about my diet plan. I'm trying to eat healthier and wondering if you have any recommendations for vitamins. No health issues, just general wellness questions.",
    expectedPriority: "LOW - General Inquiry"
  }
];


## 🧪 Testing Guide

### Test Diabetes (Low Risk):
```json
{
  "Pregnancies": 1,
  "Glucose": 85,
  "BloodPressure": 65,
  "SkinThickness": 20,
  "Insulin": 50,
  "BMI": 22,
  "DiabetesPedigreeFunction": 0.3,
  "Age": 25
}
Expected: 5-15% probability
```

### Test Diabetes (High Risk):
```json
{
  "Pregnancies": 6,
  "Glucose": 180,
  "BloodPressure": 95,
  "SkinThickness": 35,
  "Insulin": 250,
  "BMI": 38,
  "DiabetesPedigreeFunction": 1.8,
  "Age": 60
}
Expected: 85-95% probability
```

### Test Thyroid (Low Risk):
```json
{
  "age": 30,
  "on_thyroxine": 0,
  "query_on_thyroxine": 0,
  "on_antithyroid_medication": 0,
  "pregnant": 0,
  "thyroid_surgery": 0,
  "tumor": 0,
  "T3": 1.2,
  "TT4": 95,
  "T4U": 0.9,
  "FTI": 105
}
Expected: 0-10% probability
```

### Test Thyroid (High Risk):
```json
{
  "age": 55,
  "on_thyroxine": 1,
  "query_on_thyroxine": 1,
  "on_antithyroid_medication": 1,
  "pregnant": 0,
  "thyroid_surgery": 1,
  "tumor": 0,
  "T3": 3.0,
  "TT4": 170,
  "T4U": 1.7,
  "FTI": 180
}
Expected: 75-90% probability
```

### Test Breast Cancer (Benign):
```json
{
  "radius_mean": 11,
  "texture_mean": 16,
  "perimeter_mean": 70,
  "area_mean": 380,
  "smoothness_mean": 0.08,
  "compactness_mean": 0.06,
  "concavity_mean": 0.02,
  "concave_points_mean": 0.01,
  "radius_worst": 12,
  "texture_worst": 19,
  "perimeter_worst": 75,
  "area_worst": 420,
  "smoothness_worst": 0.10,
  "compactness_worst": 0.08,
  "concavity_worst": 0.03,
  "concave_points_worst": 0.02
}
Expected: 0-10% probability
```

### Test Breast Cancer (Malignant):
```json
{
  "radius_mean": 22,
  "texture_mean": 28,
  "perimeter_mean": 150,
  "area_mean": 1800,
  "smoothness_mean": 0.12,
  "compactness_mean": 0.28,
  "concavity_mean": 0.40,
  "concave_points_mean": 0.18,
  "radius_worst": 25,
  "texture_worst": 35,
  "perimeter_worst": 170,
  "area_worst": 2200,
  "smoothness_worst": 0.15,
  "compactness_worst": 0.50,
  "concavity_worst": 0.70,
  "concave_points_worst": 0.25
}
Expected: 65-80% probability

