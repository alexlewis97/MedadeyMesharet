import React from 'react'
import {
  CONTENT_WORLDS, DIVISIONS, divisionScore, divisionTarget, worldScore, worldTarget,
  metricsByFocus,
} from '../data.js'
import { SpiderChart } from '../components/Charts.jsx'

export default function HomeScreen({ onOpenWorld, division }) {
  // הסינון מגיע מהסרגל העליון: אם נבחרה חטיבה -> מציגים את היחידות שלה
  const ranking = division
    ? DIVISIONS.find((d) => d.name === division)?.units.map((u) => ({
        name: u,
        score: unitOverall(division, u),
        target: Math.min(100, unitOverall(division, u) + 10),
      })) || []
    : DIVISIONS.map((d) => ({
        name: d.name,
        score: divisionScore(d.name),
        target: divisionTarget(d.name),
      }))

  ranking.sort((a, b) => b.score - a.score)

  // נתוני העכביש - ציון מול יעד לכל עולם תוכן (מסונן לפי הסינון העליון)
  const spider = CONTENT_WORLDS.map((w) => ({
    axis: w,
    score: worldScore(w, division || undefined),
    target: worldTarget(w),
  }))

  const positives = metricsByFocus('positive').slice(0, 4)
  const negatives = metricsByFocus('negative').slice(0, 4)

  return (
    <div>
      <h1 className="page-title">
        <span>תמונת מצב</span>
      </h1>

      <div className="home-cols">
        {/* עמודה ימנית (רחבה): עכביש + תובנות */}
        <div className="home-col-main">
          <div className="panel">
            <h3 className="panel-title">תחומים {division ? `— ${division}` : ''}</h3>
            <SpiderChart data={spider} />
          </div>

          <div className="panel insights-panel">
            <h3 className="panel-title">תובנות</h3>
            <div className="insights-grid">
              {INSIGHTS.map((t, i) => (
                <div className="insight" key={i}>
                  <div className="t">{t}</div>
                  <button className="more">
                    <span>‹</span>
                    העמקת תובנה
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* עמודה שמאלית: דירוג + מדדים בסיכון/במיקוד */}
        <div className="home-col-side">
          <div className="panel">
          <div className="panel-header-row">
            <h3 className="panel-title">
              דירוג איכות השירות {division ? 'ביחידות' : 'בחטיבות'}
            </h3>
            <div className="rank-legend">
              <span className="rl-item"><span className="rl-sw bar" /> ציון נוכחי</span>
              <span className="rl-item"><span className="rl-sw target" /> יעד</span>
            </div>
          </div>
          <div className="rank-cubes">
              {ranking.map((r) => (
                <div className="rank-cube" key={r.name}>
                  <div className="rank-cube-frame">
                    <div className="rank-cube-bar" style={{ height: `${r.score}%` }}>
                      <span className="rank-cube-score">{r.score}</span>
                    </div>
                    {/* קו יעד */}
                    <div className="rank-cube-target" style={{ bottom: `${Math.min(99, r.target)}%` }}>
                      <span className="rct-label">{r.target}</span>
                    </div>
                    <div className="rank-cube-hover">
                      <div className="rch-head">
                        <span>{r.name}</span>
                        <strong>{r.score}</strong>
                      </div>
                      {CONTENT_WORLDS.map((w) => (
                        <div className="rch-row" key={w}>
                          <span className="rch-name">{w}</span>
                          <span className="rch-score">
                            {division ? worldScore(w, division) : worldScore(w, r.name)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rank-cube-name">{r.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="side-focus">
            <FocusList title="מדדים בסיכון" items={negatives} onClick={onOpenWorld} />
            <FocusList title="מדדים במיקוד" items={positives} onClick={onOpenWorld} />
          </div>
        </div>
      </div>
    </div>
  )
}

function FocusList({ title, items, onClick }) {
  return (
    <div className="metric-card">
      <div className="head">{title}</div>
      {items.map((m, i) => (
        <button
          className="metric-line"
          key={i}
          onClick={() => onClick(m.world)}
        >
          <div className="score-box">{m.score}</div>
          <div className="info">
            <div className="m">{m.metric}</div>
            <div className="w">{m.world}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

function unitOverall(division, unit) {
  const rows = []
  for (const w of CONTENT_WORLDS) rows.push(worldScore(w, division))
  let h = 0
  for (const c of unit) h = (h * 31 + c.charCodeAt(0)) % 1000
  const base = Math.round(rows.reduce((s, x) => s + x, 0) / rows.length)
  return Math.max(40, Math.min(100, base - 6 + (h % 14)))
}

const INSIGHTS = [
  'חטיבת ספרה מציגה שיפור עקבי במדדי משאבי הזמן לעומת הרבעון הקודם, עם עלייה בניצול ימי החופשה.',
  'נרשמה ירידה בתחושת השחיקה ביחידות הסייבר, ייתכן כתוצאה מהפחתת עומסי המשמרות.',
  'מדד זמן הקליטה בשיוך וגיוס עדיין מעל היעד בשלוש חטיבות — מומלץ לבחון את תהליך הקליטה.',
  'שביעות הרצון משירותיות משופרת עלתה רוחבית, עם בולטות בחטיבת המערכות.',
]
