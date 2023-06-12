import { useMemo, useState } from "react";
import "./App.css";

const W = 1000;
const R = W * 0.7;
const InnerR = R * 0.2;

function App() {
  const [n, setN] = useState(6);
  const angle = 315;

  const p = useMemo(() => {
    const mAngle = (angle / 180) * Math.PI;
    return { x: Math.cos(mAngle) * InnerR, y: Math.sin(mAngle) * InnerR };
  }, [angle]);

  const points = useMemo(
    () =>
      Array(n)
        .fill(0)
        .map((_, k) => {
          const mAngle = ((Math.PI * 2) / n) * k;
          return {
            x: Math.cos(mAngle) * R,
            y: Math.sin(mAngle) * R,
          };
        }),
    [n]
  );

  return (
    <>
      <form>
        <input
          type="range"
          min="3"
          max="12"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
        />
        {n}
      </form>

      <svg viewBox={`${-W} ${-W} ${W * 2} ${W * 2}`}>
        <defs>
          <line id="line" x1={-W} x2={W}></line>
        </defs>
        <g>
          <use xlinkHref="#line"></use>
          <use xlinkHref="#line" transform="rotate(90)"></use>
        </g>
        <circle className="circle" r={R}></circle>
        <polygon
          className="poly"
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        ></polygon>
        <g className="vertices">
          {points.map((p, k) => (
            <g key={k}>
              <line x2={p.x} y2={p.y}></line>
              <circle cx={p.x} cy={p.y} r="12"></circle>
              <text x={p.x} y={p.y}>{`${k} * ${(360 / n).toFixed(2)}°`}</text>
            </g>
          ))}
        </g>
        <g className="arc">
          <line className="radius" x2={R} transform={`rotate(${angle})`}></line>
          <path
            className="fill"
            d={`M${p.x} ${p.y}A${InnerR} ${InnerR} 0 ${Math.floor(
              angle / 180
            )} 0 ${InnerR} 0L0 0z`}
          ></path>
          <path
            className="line"
            d={`M${p.x} ${p.y}A${InnerR} ${InnerR} 0 ${Math.floor(
              angle / 180
            )} 0 ${InnerR} 0`}
          ></path>
          <text
            transform={`rotate(${angle / 2}) translate(${
              InnerR * 1.5
            }) rotate(${-angle / 2})`}
          >
            {angle.toFixed(2) + "°"}
          </text>
        </g>
        <circle r={8}></circle>
      </svg>
    </>
  );
}

export default App;
