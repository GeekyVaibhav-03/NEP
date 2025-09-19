import solver from "javascript-lp-solver";

// Solve ILP using javascript-lp-solver (MILP via branch-and-bound)
// model = { variables, objective, constraints, bounds, isBinary }
export async function solveILP(model) {
  const n = model.variables.length;
  const m = model.constraints.length;

  // Build lp-solver input
  const lp = {
    optimize: "obj",
    opType: "max",
    constraints: {},
    variables: {},
    ints: {},
  };

  // Create variable columns x0..x{n-1}
  for (let i = 0; i < n; i++) {
    const col = { obj: model.objective[i] || 0 };
    // Add each constraint coefficient for this variable; we will name rows c0..c{m-1}
    for (let ci = 0; ci < m; ci++) {
      const name = `c${ci}`;
      col[name] = model.constraints[ci].row[i] || 0;
    }
    // Bounds: if upper bound is 0, variable is effectively fixed to 0
    const [lb, ub] = model.bounds?.[i] ?? [0, 1];
    if (ub === 0) {
      continue; // skip entirely, equivalent to fixing to 0
    }

    lp.variables[`x${i}`] = col;
    if (model.isBinary?.[i]) lp.ints[`x${i}`] = 1;
  }

  // Build constraints with senses
  for (let ci = 0; ci < m; ci++) {
    const c = model.constraints[ci];
    const name = `c${ci}`;
    if (c.sense === "=") lp.constraints[name] = { equal: c.rhs };
    else if (c.sense === "<=") lp.constraints[name] = { max: c.rhs };
    else if (c.sense === ">=") lp.constraints[name] = { min: c.rhs };
    else lp.constraints[name] = { max: c.rhs };
  }

  const res = solver.Solve(lp);
  console.log("LP result:", res);
  // Extract values
  const values = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const name = `x${i}`;
    if (Object.prototype.hasOwnProperty.call(res, name))
      values[i] = res[name] || 0;
  }

  const variables = model.variables.map((v, i) => ({ ...v, value: values[i] }));

  return {
    status: res.feasible ? "OPTIMAL_OR_FEASIBLE" : "INFEASIBLE",
    objectiveValue: res.result || 0,
    variables,
    stats: { nVars: n, nCons: m },
  };
}
