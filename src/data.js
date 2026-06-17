// ============================================================================
// מקור הנתונים - שתי טבלאות "מוזרקות" כפי שתואר.
// כרגע המידע מפוברק. בהמשך אפשר להחליף את שתי המערכים האלה בנתונים אמיתיים.
// ============================================================================

// ששת עולמות התוכן המרכזיים
export const CONTENT_WORLDS = [
  'סביבת עבודה',
  'שיוך וגיוס',
  'משאבי זמן',
  'פיתוח אישי ומקצועי',
  'שירותיות משופרת',
  'שימור אנושי',
]

// חטיבות והיחידות שתחתיהן
export const DIVISIONS = [
  { name: 'חטיבת מערכות', units: ['יחידת תוכנה', 'יחידת חומרה'] },
  { name: 'חטיבת רשת', units: ['יחידת תקשורת', 'יחידת תשתיות'] },
  { name: 'חטיבת סייבר', units: ['יחידת הגנה', 'יחידת בקרה'] },
  { name: 'חטיבת ספרה', units: ['יחידת נתונים', 'יחידת אנליטיקה'] },
  { name: 'חטיבת מבצעים', units: ['יחידת שליטה', 'יחידת תפעול'] },
]

// הגדרת המדדים בכל עולם תוכן.
// graphType: 'donut' (5 קטגוריות + אחוז) | 'survey' (גרף עמודות לתשובות סקר)
//          | 'percentOnly' (ללא גרף - אחוז בלבד) | 'divisionBar' (עמודה לכל חטיבה)
//          | 'dashedBar' (אחוז מקווקו + כמות) | 'bar' (כמויות בקטגוריות)
// note: תת-כותרת הסבר למדד
// respondsToFilter: האם המדד מושפע מסינון חטיבה (ברירת מחדל true)
// valueUnit: 'percent' | 'count' - עבור divisionBar
export const METRIC_DEFS = [
  // ---------------- משאבי זמן ----------------
  { world: 'משאבי זמן', metric: 'מימוש ימי חופשה', focus: 'positive', period: 'quarterly', graphType: 'donut',
    note: 'אחוזי מימוש ימי החופשה של אנשי הקבע', unit: 'ימים',
    categories: ['0-20%', '20-41%', '41-60%', '60-80%', '80-100%'] },
  { world: 'משאבי זמן', metric: 'מימוש ימי מחלה', focus: 'negative', period: 'quarterly', graphType: 'donut',
    note: 'אחוזי ניצול ימי מחלה לפי טווח ימים', unit: 'ימים',
    categories: ['0-5', '6-10', '11-15', '16-20', '20+'] },
  { world: 'משאבי זמן', metric: 'סקר הקבע - מידת איזון עבודה-חיים', focus: 'positive', period: 'annual', graphType: 'survey',
    note: 'הסקר בוצע בתאריך 17/02, 84% ממשרתי הקבע השיבו',
    categories: ['במידה רבה מאוד', 'במידה רבה', 'במידה בינונית', 'במידה מועטה', 'במידה מועטה מאוד'] },
  { world: 'משאבי זמן', metric: 'סקר הקבע - מידת תחושת השחיקה', focus: 'negative', period: 'annual', graphType: 'survey',
    note: 'הסקר בוצע בתאריך 17/02, 84% ממשרתי הקבע השיבו',
    categories: ['במידה רבה מאוד', 'במידה רבה', 'במידה בינונית', 'במידה מועטה', 'במידה מועטה מאוד'] },

  // ---------------- סביבת עבודה ----------------
  { world: 'סביבת עבודה', metric: 'סקר הקבע - שביעות הרצון מסביבת העבודה הפיזית', focus: 'positive', period: 'annual', graphType: 'survey',
    note: 'הסקר בוצע בתאריך 17/02, 84% ממשרתי הקבע השיבו',
    categories: ['במידה רבה מאוד', 'במידה רבה', 'במידה בינונית', 'במידה מועטה', 'במידה מועטה מאוד'] },
  { world: 'סביבת עבודה', metric: 'תקלות בינוי חורגות מזמן טיפול', focus: 'negative', period: 'quarterly', graphType: 'percentOnly',
    note: 'ממתינות יותר מ-30 ימים', respondsToFilter: false, categories: [] },
  { world: 'סביבת עבודה', metric: 'בקשות הלנה חורגות', focus: 'negative', period: 'quarterly', graphType: 'percentOnly',
    note: 'ממתינות יותר מ-30 ימים', respondsToFilter: false, categories: [] },
  { world: 'סביבת עבודה', metric: 'זמן אספקה של רכב אישי', focus: 'positive', period: 'quarterly', graphType: 'dashedBar',
    note: 'אנשי קבע שקיבלו רכב תוך 30 ימים', valueUnit: 'percent', countUnit: 'אנשי קבע', categories: [] },

  // ---------------- שיוך וגיוס ----------------
  { world: 'שיוך וגיוס', metric: 'מעבריות פנים אגף', focus: 'positive', period: 'annual', graphType: 'divisionBar',
    note: 'דרגות רס"ר/רס"ן ומעלה', valueUnit: 'percent', categories: [] },
  { world: 'שיוך וגיוס', metric: 'סקר הקבע - מידת תחושת הגאווה לשרת בצה"ל', focus: 'positive', period: 'annual', graphType: 'survey',
    note: 'הסקר בוצע בתאריך 17/02, 84% ממשרתי הקבע השיבו',
    categories: ['במידה רבה מאוד', 'במידה רבה', 'במידה בינונית', 'במידה מועטה', 'במידה מועטה מאוד'] },
  { world: 'שיוך וגיוס', metric: 'סקר הקבע - מידת שביעות הרצון מהתפקיד', focus: 'positive', period: 'annual', graphType: 'survey',
    note: 'הסקר בוצע בתאריך 17/02, 84% ממשרתי הקבע השיבו',
    categories: ['במידה רבה מאוד', 'במידה רבה', 'במידה בינונית', 'במידה מועטה', 'במידה מועטה מאוד'] },

  // ---------------- פיתוח אישי ומקצועי ----------------
  { world: 'פיתוח אישי ומקצועי', metric: 'אנשי קבע ללא קורס', focus: 'negative', period: 'annual', graphType: 'dashedBar',
    note: 'לא יצאו לקורס בשנתיים האחרונות', valueUnit: 'percent', countUnit: 'אנשי קבע', categories: [] },
  { world: 'פיתוח אישי ומקצועי', metric: 'אנשי קבע מובהק ללא השכלה', focus: 'negative', period: 'annual', graphType: 'divisionBar',
    note: 'דרגת רס"ר/רס"ן ומעלה', valueUnit: 'percent', categories: [] },
  { world: 'פיתוח אישי ומקצועי', metric: 'אנשי קבע זכאים ללא גמו"ש', focus: 'negative', period: 'annual', graphType: 'divisionBar',
    note: 'בעלי תואר שטרם השלימו גמול השתלמות', valueUnit: 'percent', categories: [] },
  { world: 'פיתוח אישי ומקצועי', metric: 'סקר הקבע - ראיית המפקד הישיר כדמות לחיקוי', focus: 'positive', period: 'annual', graphType: 'survey',
    note: 'הסקר בוצע בתאריך 17/02, 84% ממשרתי הקבע השיבו',
    categories: ['במידה רבה מאוד', 'במידה רבה', 'במידה בינונית', 'במידה מועטה', 'במידה מועטה מאוד'] },

  // ---------------- שירותיות משופרת ----------------
  { world: 'שירותיות משופרת', metric: 'זמן מענה לפניות', focus: 'negative', period: 'quarterly', graphType: 'bar',
    note: 'התפלגות זמן המענה לפניות (שעות)', unit: 'שעות',
    categories: ['0-2', '3-5', '6-12', '13-24', '24+'] },
  { world: 'שירותיות משופרת', metric: 'פניות שטופלו', focus: 'positive', period: 'quarterly', graphType: 'divisionBar',
    note: 'אחוז הפניות שטופלו במלואן', valueUnit: 'percent', categories: [] },
  { world: 'שירותיות משופרת', metric: 'פתרון מהפעם הראשונה', focus: 'positive', period: 'quarterly', graphType: 'dashedBar',
    note: 'פניות שנפתרו במגע הראשון', valueUnit: 'percent', countUnit: 'פניות', categories: [] },

  // ---------------- שימור אנושי ----------------
  { world: 'שימור אנושי', metric: 'אירועי משמעת', focus: 'negative', period: 'annual', graphType: 'divisionBar',
    note: 'כמות אירועי המשמעת', valueUnit: 'count', categories: [] },
  { world: 'שימור אנושי', metric: 'עזיבות בקבע - קצר"ש ביוזמת הפרט', focus: 'negative', period: 'annual', graphType: 'divisionBar',
    note: 'אחוז המשתחררים משירות קבע ע"י קיצור שירות ביוזמת הפרט', valueUnit: 'percent', categories: [] },
  { world: 'שימור אנושי', metric: 'עזיבות בקבע - תת"ש', focus: 'negative', period: 'annual', graphType: 'divisionBar',
    note: 'אחוז המשתחררים משירות קבע עקב תום שירות', valueUnit: 'percent', categories: [] },
  { world: 'שימור אנושי', metric: 'סקר הקבע - תחושת ההערכה', focus: 'positive', period: 'annual', graphType: 'survey',
    note: 'הסקר בוצע בתאריך 17/02, 84% ממשרתי הקבע השיבו',
    categories: ['במידה רבה מאוד', 'במידה רבה', 'במידה בינונית', 'במידה מועטה', 'במידה מועטה מאוד'] },
]

// ---- מחולל מספרים פסבדו-אקראי דטרמיניסטי (כדי שהנתונים יהיו יציבים) ----
function seeded(seedStr) {
  let h = 1779033703 ^ seedStr.length
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
}

const PERIOD = { quarter: 'Q1', year: 2026, label: 'רבעון 1 / 2026' }

// ============================================================================
// טבלה 1 - טבלת הציונים (משמשת את מסך 1 ומסך 2)
// עמודות: isDivision, unitName, divisionName, world, metric, score,
//          population, focus, target, period, graphType
// ============================================================================
export const SCORES_TABLE = buildScoresTable()

function buildScoresTable() {
  const rows = []
  for (const def of METRIC_DEFS) {
    for (const div of DIVISIONS) {
      // שורת חטיבה
      const r = seeded(div.name + def.metric)
      const score = 45 + Math.round(r() * 50)
      rows.push({
        isDivision: true,
        unitName: null,
        divisionName: div.name,
        world: def.world,
        metric: def.metric,
        score,
        population: 80 + Math.round(r() * 220),
        focus: def.focus,
        target: Math.min(100, score + 5 + Math.round(r() * 15)),
        period: def.period === 'quarterly' ? PERIOD.label : String(PERIOD.year),
        graphType: def.graphType,
      })
      // שורות היחידות שתחת החטיבה
      for (const u of div.units) {
        const ru = seeded(u + def.metric)
        const us = Math.max(40, Math.min(100, score - 8 + Math.round(ru() * 20)))
        rows.push({
          isDivision: false,
          unitName: u,
          divisionName: div.name,
          world: def.world,
          metric: def.metric,
          score: us,
          population: 25 + Math.round(ru() * 90),
          focus: def.focus,
          target: Math.min(100, us + 5 + Math.round(ru() * 12)),
          period: def.period === 'quarterly' ? PERIOD.label : String(PERIOD.year),
          graphType: def.graphType,
        })
      }
    }
  }
  return rows
}

// ============================================================================
// טבלה 2 - טבלת הפילוח (משמשת את מסך 3)
// עמודות: unitName/divisionName, world, metric, [c1..c5] כמויות לפי קטגוריה,
//          categories (שמות), period
// ============================================================================
export const BREAKDOWN_TABLE = buildBreakdownTable()

function buildBreakdownTable() {
  const rows = []
  for (const def of METRIC_DEFS) {
    for (const div of DIVISIONS) {
      rows.push(makeBreakdownRow(def, div.name, null, true))
      for (const u of div.units) {
        rows.push(makeBreakdownRow(def, div.name, u, false))
      }
    }
  }
  return rows
}

function makeBreakdownRow(def, divisionName, unitName, isDivision) {
  const r = seeded((unitName || divisionName) + def.metric + 'brk')
  const counts = def.categories.map(() => 5 + Math.round(r() * 60))
  return {
    isDivision,
    divisionName,
    unitName,
    world: def.world,
    metric: def.metric,
    graphType: def.graphType,
    unit: def.unit,
    categories: def.categories,
    counts,
    period: def.period === 'quarterly' ? PERIOD.label : String(PERIOD.year),
  }
}

// ============================================================================
// פונקציות עזר נגזרות
// ============================================================================

// ציון כללי של חטיבה (ממוצע על כל המדדים שלה)
export function divisionScore(divisionName) {
  const rows = SCORES_TABLE.filter((x) => x.isDivision && x.divisionName === divisionName)
  if (!rows.length) return 0
  return Math.round(rows.reduce((s, x) => s + x.score, 0) / rows.length)
}

// ציון כללי של עולם תוכן (ממוצע על כל החטיבות, על מדדי העולם)
export function worldScore(world, divisionFilter) {
  const rows = SCORES_TABLE.filter(
    (x) => x.isDivision && x.world === world && (!divisionFilter || x.divisionName === divisionFilter)
  )
  if (!rows.length) return 0
  return Math.round(rows.reduce((s, x) => s + x.score, 0) / rows.length)
}

export function worldTarget(world) {
  const rows = SCORES_TABLE.filter((x) => x.isDivision && x.world === world)
  if (!rows.length) return 100
  return Math.round(rows.reduce((s, x) => s + x.target, 0) / rows.length)
}

// ציון כללי של כל המערכת
export function overallScore() {
  const all = DIVISIONS.map((d) => divisionScore(d.name))
  return Math.round(all.reduce((s, x) => s + x, 0) / all.length)
}

// מדדים לפי מיקוד (חיובי/שלילי) - מחזיר רשימה ייחודית של מדדים
export function metricsByFocus(focus) {
  const seen = new Map()
  for (const row of SCORES_TABLE) {
    if (!row.isDivision) continue
    if (row.focus !== focus) continue
    const key = row.world + '|' + row.metric
    if (!seen.has(key)) {
      seen.set(key, { metric: row.metric, world: row.world, scores: [], targets: [] })
    }
    seen.get(key).scores.push(row.score)
    seen.get(key).targets.push(row.target)
  }
  return Array.from(seen.values()).map((m) => {
    const avg = Math.round(m.scores.reduce((s, x) => s + x, 0) / m.scores.length)
    const tAvg = Math.round(m.targets.reduce((s, x) => s + x, 0) / m.targets.length)
    return { metric: m.metric, world: m.world, score: avg, delta: avg - tAvg }
  })
}

// רשימת המדדים בעולם תוכן
export function metricsOfWorld(world) {
  const seen = []
  for (const def of METRIC_DEFS) {
    if (def.world === world) seen.push(def)
  }
  return seen
}

// ציון מדד מסוים לכל חטיבה (או יחידות של חטיבה אם נבחרה חטיבה)
export function metricScoresByEntity(world, metric, drillDivision) {
  if (drillDivision) {
    return SCORES_TABLE.filter(
      (x) => !x.isDivision && x.world === world && x.metric === metric && x.divisionName === drillDivision
    ).map((x) => ({ name: x.unitName, score: x.score, target: x.target, population: x.population }))
  }
  return SCORES_TABLE.filter((x) => x.isDivision && x.world === world && x.metric === metric).map((x) => ({
    name: x.divisionName,
    score: x.score,
    target: x.target,
    population: x.population,
  }))
}

// פילוח קטגוריות למדד לכל ישות (מסך 3)
export function breakdownByEntity(world, metric, drillDivision) {
  if (drillDivision) {
    return BREAKDOWN_TABLE.filter(
      (x) => !x.isDivision && x.world === world && x.metric === metric && x.divisionName === drillDivision
    ).map((x) => ({ name: x.unitName, ...x }))
  }
  return BREAKDOWN_TABLE.filter((x) => x.isDivision && x.world === world && x.metric === metric).map((x) => ({
    name: x.divisionName,
    ...x,
  }))
}

export const META = { period: PERIOD }

// פילוח כל מדדי עולם התוכן עבור יחידה ספציפית (מסך 3)
export function unitBreakdown(world, unit) {
  return BREAKDOWN_TABLE.filter(
    (x) => !x.isDivision && x.world === world && x.unitName === unit
  )
}

// ============================================================================
// מסך עולם תוכן (מאוחד) - לכל מדד: פילוח קטגוריות מצרפי + ציון לכל חטיבה
// divisionFilter: null = כל היחידות, אחרת מסונן לחטיבה ספציפית
// ============================================================================
export function worldMetrics(world, divisionFilter) {
  const defs = metricsOfWorld(world)
  return defs.map((def) => {
    const respondsToFilter = def.respondsToFilter !== false
    const activeFilter = respondsToFilter ? divisionFilter : null

    // צבירת הכמויות בקטגוריות (לסוגי גרף מבוססי קטגוריות)
    const rows = BREAKDOWN_TABLE.filter(
      (x) =>
        !x.isDivision &&
        x.world === world &&
        x.metric === def.metric &&
        (!activeFilter || x.divisionName === activeFilter)
    )
    const counts = (def.categories || []).map((_, i) =>
      rows.reduce((s, r) => s + (r.counts[i] || 0), 0)
    )
    const total = counts.reduce((s, x) => s + x, 0) || 1
    const percentages = counts.map((c) => Math.round((c / total) * 100))

    // ערך אחוז/כמות בודד (percentOnly / dashedBar) - דטרמיניסטי
    const rSingle = seeded(def.metric + (activeFilter || 'agg') + 'single')
    const singlePercent = 8 + Math.round(rSingle() * 80)
    const singleCount = 20 + Math.round(rSingle() * 400)

    // ערך לכל חטיבה (divisionBar / dashedBar) - אחוז או כמות
    const perDivision = (activeFilter
      ? DIVISIONS.find((d) => d.name === activeFilter).units
      : DIVISIONS.map((d) => d.name)
    ).map((name) => {
      const rd = seeded(def.metric + name + 'pd')
      const value = def.valueUnit === 'count' ? 5 + Math.round(rd() * 60) : 5 + Math.round(rd() * 90)
      return { name: shortName(name), value }
    })

    // ציון לכל חטיבה (או יחידה אם סוננה חטיבה) - לתחתית הגרף
    const scores = activeFilter
      ? SCORES_TABLE.filter(
          (x) => !x.isDivision && x.world === world && x.metric === def.metric && x.divisionName === activeFilter
        ).map((x) => ({ name: shortName(x.unitName), score: x.score }))
      : SCORES_TABLE.filter(
          (x) => x.isDivision && x.world === world && x.metric === def.metric
        ).map((x) => ({ name: shortName(x.divisionName), score: x.score }))

    const totalScore = Math.round(
      scores.reduce((s, x) => s + x.score, 0) / (scores.length || 1)
    )

    return {
      ...def,
      respondsToFilter,
      counts,
      percentages,
      total,
      singlePercent,
      singleCount,
      perDivision,
      scores,
      totalScore,
    }
  })
}

function shortName(full) {
  // 'חטיבת ספרה' -> 'ספרה' ; 'יחידת תוכנה' -> 'תוכנה'
  return full.replace(/^חטיבת\s+/, '').replace(/^יחידת\s+/, '')
}
