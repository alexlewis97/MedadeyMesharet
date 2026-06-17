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

// הגדרת המדדים בכל עולם תוכן: שם, מיקוד, תדירות, סוג גרף, וקטגוריות הפילוח
// graphType: 'bar' (כמויות) | 'donut' | 'pie' | 'kpi' (מדד בינארי - אחוז)
export const METRIC_DEFS = [
  // משאבי זמן
  { world: 'משאבי זמן', metric: 'ניצול ימי חופשה', focus: 'positive', period: 'quarterly', graphType: 'donut',
    unit: 'ימים', categories: ['0-20%', '20-41%', '41-60%', '60-80%', '80-100%'] },
  { world: 'משאבי זמן', metric: 'מימוש ימי מחלה', focus: 'negative', period: 'quarterly', graphType: 'donut',
    unit: 'ימים', categories: ['0-5', '6-10', '11-15', '16-20', '20+'] },
  { world: 'משאבי זמן', metric: 'איזון מול שחיקה', focus: 'positive', period: 'quarterly', graphType: 'kpi',
    unit: 'דירוג', categories: ['איזון', 'שחיקה'] },
  { world: 'משאבי זמן', metric: 'מידת שחיקה', focus: 'negative', period: 'quarterly', graphType: 'bar',
    unit: 'דירוג', categories: ['לא חשים שחיקה', 'מידה מעטה', 'בינונית', 'מרובה', 'מרובה מאוד'] },

  // סביבת עבודה
  { world: 'סביבת עבודה', metric: 'שביעות רצון מהסביבה', focus: 'positive', period: 'annual', graphType: 'pie',
    unit: 'דירוג', categories: ['מרוצה מאוד', 'מרוצה', 'לא מרוצה', 'מאוד לא מרוצה'] },
  { world: 'סביבת עבודה', metric: 'תקלות בינוי', focus: 'negative', period: 'quarterly', graphType: 'bar',
    unit: 'תקלות', categories: ['0-10', '11-20', '21-30', '31-40', '41+'] },
  { world: 'סביבת עבודה', metric: 'בקשות הלנה', focus: 'negative', period: 'quarterly', graphType: 'bar',
    unit: 'בקשות', categories: ['0-30', '31-60', '61-90', '91-120', '121+'] },
  { world: 'סביבת עבודה', metric: 'תחושת ביטחון תעסוקתי', focus: 'positive', period: 'annual', graphType: 'kpi',
    unit: 'דירוג', categories: ['חשים ביטחון', 'לא חשים ביטחון'] },

  // שיוך וגיוס
  { world: 'שיוך וגיוס', metric: 'שביעות רצון מהגיוס', focus: 'positive', period: 'annual', graphType: 'donut',
    unit: 'דירוג', categories: ['גבוה מאוד', 'גבוה', 'בינוני', 'נמוך', 'נמוך מאוד'] },
  { world: 'שיוך וגיוס', metric: 'זמן קליטה', focus: 'negative', period: 'quarterly', graphType: 'bar',
    unit: 'ימים', categories: ['0-7', '8-14', '15-21', '22-30', '31+'] },
  { world: 'שיוך וגיוס', metric: 'תחושת שייכות', focus: 'positive', period: 'annual', graphType: 'pie',
    unit: 'דירוג', categories: ['חזקה מאוד', 'חזקה', 'בינונית', 'חלשה', 'חלשה מאוד'] },
  { world: 'שיוך וגיוס', metric: 'ממליץ על השירות', focus: 'positive', period: 'annual', graphType: 'kpi',
    unit: 'דירוג', categories: ['ממליץ', 'לא ממליץ'] },

  // פיתוח אישי ומקצועי
  { world: 'פיתוח אישי ומקצועי', metric: 'הזדמנויות קידום', focus: 'positive', period: 'annual', graphType: 'pie',
    unit: 'דירוג', categories: ['רבות מאוד', 'רבות', 'בינוני', 'מעט', 'מעט מאוד'] },
  { world: 'פיתוח אישי ומקצועי', metric: 'ימי הכשרה', focus: 'positive', period: 'quarterly', graphType: 'bar',
    unit: 'ימים', categories: ['0-3', '4-7', '8-12', '13-18', '19+'] },
  { world: 'פיתוח אישי ומקצועי', metric: 'משוב מקצועי', focus: 'positive', period: 'annual', graphType: 'donut',
    unit: 'דירוג', categories: ['מצוין', 'טוב', 'בינוני', 'חלש'] },
  { world: 'פיתוח אישי ומקצועי', metric: 'מרוצה ממסלול הפיתוח', focus: 'positive', period: 'annual', graphType: 'kpi',
    unit: 'דירוג', categories: ['מרוצה', 'לא מרוצה'] },

  // שירותיות משופרת
  { world: 'שירותיות משופרת', metric: 'זמן מענה לפניות', focus: 'negative', period: 'quarterly', graphType: 'bar',
    unit: 'שעות', categories: ['0-2', '3-5', '6-12', '13-24', '24+'] },
  { world: 'שירותיות משופרת', metric: 'שביעות רצון מהשירות', focus: 'positive', period: 'annual', graphType: 'donut',
    unit: 'דירוג', categories: ['מרוצה מאוד', 'מרוצה', 'נייטרלי', 'לא מרוצה'] },
  { world: 'שירותיות משופרת', metric: 'פניות שטופלו', focus: 'positive', period: 'quarterly', graphType: 'bar',
    unit: 'אחוז', categories: ['0-20', '21-40', '41-60', '61-80', '81-100'] },
  { world: 'שירותיות משופרת', metric: 'פתרון מהפעם הראשונה', focus: 'positive', period: 'quarterly', graphType: 'kpi',
    unit: 'דירוג', categories: ['נפתר', 'לא נפתר'] },

  // שימור אנושי
  { world: 'שימור אנושי', metric: 'אחוז עזיבה', focus: 'negative', period: 'annual', graphType: 'bar',
    unit: 'אחוז', categories: ['0-5', '6-10', '11-15', '16-20', '21+'] },
  { world: 'שימור אנושי', metric: 'כוונת הישארות', focus: 'positive', period: 'annual', graphType: 'pie',
    unit: 'דירוג', categories: ['בוודאות', 'כנראה', 'מתלבט', 'כנראה שלא', 'בוודאות שלא'] },
  { world: 'שימור אנושי', metric: 'תחושת הערכה', focus: 'positive', period: 'annual', graphType: 'donut',
    unit: 'דירוג', categories: ['גבוהה מאוד', 'גבוהה', 'בינונית', 'נמוכה'] },
  { world: 'שימור אנושי', metric: 'גאוות יחידה', focus: 'positive', period: 'annual', graphType: 'kpi',
    unit: 'דירוג', categories: ['גאים', 'לא גאים'] },
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
    // צבירת הכמויות בקטגוריות על פני כל היחידות (או יחידות החטיבה המסוננת)
    const rows = BREAKDOWN_TABLE.filter(
      (x) =>
        !x.isDivision &&
        x.world === world &&
        x.metric === def.metric &&
        (!divisionFilter || x.divisionName === divisionFilter)
    )
    const counts = def.categories.map((_, i) =>
      rows.reduce((s, r) => s + r.counts[i], 0)
    )
    const total = counts.reduce((s, x) => s + x, 0) || 1
    const percentages = counts.map((c) => Math.round((c / total) * 100))

    // ציון לכל חטיבה (או לכל יחידה אם סוננה חטיבה) - לתצוגה בתחתית הגרף
    const scores = divisionFilter
      ? SCORES_TABLE.filter(
          (x) => !x.isDivision && x.world === world && x.metric === def.metric && x.divisionName === divisionFilter
        ).map((x) => ({ name: shortName(x.unitName), score: x.score }))
      : SCORES_TABLE.filter(
          (x) => x.isDivision && x.world === world && x.metric === def.metric
        ).map((x) => ({ name: shortName(x.divisionName), score: x.score }))

    // ציון מצרפי (סה"כ) לראש שורת הציונים
    const totalScore = Math.round(
      scores.reduce((s, x) => s + x.score, 0) / (scores.length || 1)
    )

    return {
      ...def,
      counts,
      percentages,
      total,
      scores,
      totalScore,
    }
  })
}

function shortName(full) {
  // 'חטיבת ספרה' -> 'ספרה' ; 'יחידת תוכנה' -> 'תוכנה'
  return full.replace(/^חטיבת\s+/, '').replace(/^יחידת\s+/, '')
}
