
export function getRaceFuel(hotlapSec, fuelPerLap, raceTimeMin, warmupLap) {
    const raceTimeSec = raceTimeMin * 60;
    const lapsCount = Math.ceil(raceTimeSec / hotlapSec);
    let fuel = lapsCount * fuelPerLap;
    fuel += warmupLap ? fuelPerLap * 0.7 : fuelPerLap * 0.2;
    return fuel.toFixed(2);
}