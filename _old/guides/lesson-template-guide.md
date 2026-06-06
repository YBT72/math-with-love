# 📚 מדריך לשימוש ב-Template שיעורים - מספרים מרוכבים

## 🎯 מה זה?
Template זה מאפשר לך ליצור דפי שיעורים עם עיצוב אחיד ופונקציונליות מלאה **ללא תכנות**!

## 🚀 איך מתחילים?

### שלב 1: העתקת הטמפלט
```
העתק את הקובץ: templates/lesson-template.html
למיקום חדש: pages/courses/5-units/35572/[מודול]/[שם-השיעור].html

לדוגמה:
pages/courses/5-units/35572/complex/unit1-algebraic-form.html
pages/courses/5-units/35572/vectors/unit1-vector-basics.html
pages/courses/5-units/35572/calculus/unit1-derivatives.html
```

### שלב 2: מילוי תוכן
חפש את כל המקומות עם: **[כאן להכניס...]** ומלא אותם

## 📝 מבנה הטמפלט

### 🔖 שלושה טאבים ראשיים:

#### **טאב א': תיאוריה ודוגמאות** 📚
- 🎯 מטרות השיעור
- 📖 הקניית ידע (נוסחאות והסברים)
- 🔍 דוגמאות מפורטות עם פתרון צעד אחר צעד
- 🎨 ויזואליזציה אינטראקטיבית
- 💡 טיפים חשובים

#### **טאב ב': תרגול מונחה** 💪
- תרגילים עם רמזים
- פתרונות מדורגים (צעד אחר צעד)
- טיפים לכל תרגיל

#### **טאב ג': שיעורי בית** 🏠
- רשימת תרגילים עם ניקוד
- תשובות סופיות (מוסתרות)
- משאבים נוספים

## ✏️ איך ממלאים את הטמפלט?

### 1. **פרטי השיעור הכלליים**
```html
<h1>[כאן להכניס: כותרת השיעור]</h1>
<p class="lesson-subtitle">[כאן להכניס: תיאור קצר]</p>

<span class="meta-text">[כאן להכניס: זמן משוער] דקות</span>
<span class="meta-text">רמה: [כאן להכניס: בסיסי/בינוני/מתקדם]</span>
```

**דוגמה:**
```html
<h1>הצגה אלגברית של מספרים מרוכבים</h1>
<p class="lesson-subtitle">למידת מבנה המספר המרוכב a+bi ופעולות בסיסיות</p>

<span class="meta-text">45 דקות</span>
<span class="meta-text">רמה: בסיסי</span>
```

### 2. **מטרות השיעור**
```html
<li>[כאן להכניס: מטרה ראשונה]</li>
<li>[כאן להכניס: מטרה שנייה]</li>
```

**דוגמה:**
```html
<li>הבנת מבנה המספר המרוכב בצורה אלגברית a+bi</li>
<li>זיהוי החלק הממשי והחלק המדומה</li>
```

### 3. **תיאוריה ונוסחאות**
```html
<div class="theory-block">
  <h3>[כאן להכניס: כותרת נושא]</h3>
  <p>[כאן להכניס: הסבר תיאורטי]</p>
  
  <div class="formula-box">
    <div class="formula-title">נוסחה חשובה:</div>
    <div class="formula">[כאן להכניס: נוסחה מתמטית]</div>
  </div>
</div>
```

### 4. **דוגמאות עם פתרון**
```html
<div class="example-box">
  <h3 class="example-title">דוגמה 1: [כותרת]</h3>
  <div class="example-problem">
    <strong>שאלה:</strong> [נוסח השאלה]
  </div>
  <div class="example-solution">
    <strong>פתרון:</strong>
    <div class="solution-steps">
      <div class="step">
        <span class="step-number">1</span>
        <span class="step-content">[צעד ראשון]</span>
      </div>
      <!-- עוד צעדים... -->
    </div>
    <div class="final-answer">
      <strong>תשובה סופית:</strong> [התשובה]
    </div>
  </div>
</div>
```

### 5. **תרגילים מונחים**
```html
<div class="section-card exercise">
  <h3 class="exercise-title">תרגיל 1: [כותרת]</h3>
  <div class="exercise-content">
    <div class="exercise-problem">
      <strong>שאלה:</strong> [נוסח התרגיל]
    </div>

    <div class="exercise-tools">
      <button class="hint-btn" onclick="toggleHint('ex1')">💡 רמז</button>
      <button class="solution-btn" onclick="toggleSolution('ex1')">📝 הצג פתרון</button>
      <button class="step-btn" onclick="showNextStep('ex1')">👣 צעד הבא</button>
    </div>

    <div class="hint-box" id="ex1-hint" style="display: none;">
      <strong>רמז:</strong> [רמז לפתרון]
    </div>
    
    <!-- פתרון מדורג... -->
  </div>
</div>
```

### 6. **תרגילי בית**
```html
<div class="homework-exercise">
  <div class="homework-header">
    <h4 class="homework-title">תרגיל 1</h4>
    <span class="homework-points">[X] נקודות</span>
  </div>
  <div class="homework-problem">
    [נוסח תרגיל הבית]
  </div>
  <div class="homework-answer">
    <button class="answer-toggle" onclick="toggleAnswer('hw1')">👁️ הצג תשובה</button>
    <div class="answer-content" id="hw1-answer" style="display: none;">
      <strong>תשובה:</strong> [התשובה הסופית]
    </div>
  </div>
</div>
```

## ⚠️ דברים חשובים לזכור

### 🔢 מספרי ID ייחודיים
כל תרגיל חייב מספר ID ייחודי:
- תרגיל 1: `ex1-hint`, `ex1-solution`
- תרגיל 2: `ex2-hint`, `ex2-solution`
- תרגיל בית 1: `hw1-answer`
- תרגיל בית 2: `hw2-answer`

### 🔗 ניווט ונתיבים
עדכן את הנתיבים בחלק הניווט בהתאם למיקום הקובץ:

**לשיעורים ב-complex:**
```html
<!-- Breadcrumb -->
<a href="#" onclick="window.pageLoader.loadPage('courses/5-units/35572/complex/module-index')">מספרים מרוכבים</a>

<!-- ניווט בין שיעורים -->
<button onclick="window.pageLoader.loadPage('courses/5-units/35572/complex/unit2-operations')">
  שיעור הבא →
</button>

<!-- נתיבי CSS ו-assets -->
<link rel="stylesheet" href="../../../../styles/lesson-template.css">
<iframe src="../../../../assets/widgets/complex/c_algebric/demo.html">
```

**לשיעורים ב-vectors:**
```html
<!-- Breadcrumb -->
<a href="#" onclick="window.pageLoader.loadPage('courses/5-units/35572/vectors/module-index')">וקטורים</a>

<!-- ניווט בין שיעורים -->
<button onclick="window.pageLoader.loadPage('courses/5-units/35572/vectors/unit2-operations')">
  שיעור הבא →
</button>
```

### 🎨 ויזואליזציה
אם יש לך קובץ HTML ויזואליזציה:
```html
<iframe src="assets/widgets/complex/c_algebric/[שם-הקובץ].html" 
        width="100%" 
        height="400" 
        frameborder="0">
</iframe>
```

## 📋 Checklist לפני פרסום

### ✅ תוכן
- [ ] מילאתי את כל ה-[כאן להכניס...]
- [ ] בדקתי שכל הנוסחאות נכונות
- [ ] וידאתי שהדוגמאות מובנות
- [ ] הוספתי טיפים שימושיים

### ✅ טכני
- [ ] עדכנתי את נתיבי הניווט
- [ ] בדקתי שמספרי ה-ID ייחודיים
- [ ] וידאתי שקישורי הויזואליזציה עובדים
- [ ] שמרתי את הקובץ במיקום הנכון

### ✅ תצוגה
- [ ] בדקתי שהעמוד נטען בדפדפן
- [ ] וידאתי שכל הטאבים עובדים
- [ ] בדקתי שכפתורי הרמזים והפתרונות פועלים

## 🔄 עזרה נוספת

### העתקת תרגילים
כדי לחסוך זמן, העתק את המבנה של תרגיל קיים ושנה:
1. את המספר במספר ID
2. את נוסח השאלה
3. את הרמז והפתרון

### שינוי עיצוב
כל הצבעים והגדלים מוגדרים ב-`styles/lesson-template.css`
אם תרצה לשנות משהו, עדכן שם.

---

## 🌟 דוגמה מלאה
ראה את הקבצים:
- `templates/topics/complex-numbers/algebraic-form.html` - טמפלט מעודכן
- `pages/courses/5-units/35572/complex/unit1-algebraic-form.html` - דוגמה מלאה של שיעור

**מבנה התיקיות המומלץ:**
```
pages/courses/5-units/35572/
├── 35572-index.html (דף הבחירה הראשי)
├── complex/
│   ├── module-index.html (רשימת שיעורי מספרים מרוכבים)
│   ├── unit1-algebraic-form.html
│   ├── unit2-complex-operations.html
│   └── unit3-polar-form.html
├── vectors/
│   ├── module-index.html (רשימת שיעורי וקטורים)
│   ├── unit1-vector-basics.html
│   └── unit2-vector-operations.html
├── calculus/
│   ├── module-index.html (רשימת שיעורי חדו״א)
│   └── unit1-derivatives.html
└── analitic-geometry/
    ├── module-index.html
    └── unit1-lines.html
```

**בהצלחה! 🚀**
