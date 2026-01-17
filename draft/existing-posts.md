# Existing Posts Cross-Reference

This file lists all existing posts with their descriptions and key points to help with cross-referencing when writing new tests.

## Posts Analyzed

### mesurer-la-consommation-avec-shelly-plus-plug-s
**Title:** Mesurer la consommation avec une prise connectée Shelly Plus Plug S
**Summary:** Detailed guide on using a Shelly Plus Plug S smart plug to record power consumption profiles of electrical devices. Covers both hardware capabilities and software implementation for data collection and visualization.
**Key points:**
- Smart plug allows automation and energy measurement (around 25€)
- Wifi-based, can work locally without cloud (privacy preference)
- Custom JavaScript script runs on plug, measures power every second
- 10-minute history buffer on device prevents data loss during wifi issues
- Measures up to 2500W with 0.1W precision
- Web interface for live profiling using Firefox Profiler
- Can export to CSV or JSON format
- Suitable for long recordings (hours or days)
- Example profiles include angle grinder and laptop charger (10 hours)

### mesurer-la-consommation-avec-shelly-em
**Title:** Mesurer la consommation avec un module Shelly EM
**Summary:** Guide to installing Shelly EM/3EM modules in electrical panel for measuring high-power appliances, critical devices, or whole zones/house consumption. Includes real installation example with 7 measurement points.
**Key points:**
- Electrical panel is central point ideal for measurements
- When smart plugs are inadequate: high power appliances (>10A), critical reliability devices (freezer), whole zones/house
- Author's panel setup: 1x Shelly 3EM (3 points) + 2x Shelly EM (4 points) = 7 measurements total
- Measurements taken: grid connection, home office, solar panels, washing machine/dryer, gas boiler, freezer, first floor
- Clamp-based current measurement (non-invasive)
- Wifi communication, MQTT or HTTP API for local data collection
- Privacy: local data only, no cloud
- Scripts convert data to Firefox Profiler format
- Example profile shows full day with solar production, grid import/export, per-zone consumption patterns
- Can identify appliance usage patterns (washing machine heating, kitchen meal prep times, freezer cycles)

### mesurer-la-consommation-avec-un-wattmetre-de-laboratoire-isw8001
**Title:** mesurer la consommation avec un wattmètre de laboratoire programmable ISW8001
**Summary:** Guide to using the ISW8001 professional laboratory wattmeter for high-precision power measurements, particularly for low standby consumption. Details reverse engineering of RS-232 protocol and measurement artifacts.
**Key points:**
- IeS ISW8001A professional lab wattmeter (French manufacturer, liquidated Nov 2024)
- Resolution down to 1 mW (0.001W), ideal for standby measurements <1W
- 2.1 Hz sampling rate (470ms between samples) via RS-232 serial port
- Measures AC and DC current
- Banana plug connections (standard for lab equipment with DC power supplies)
- USB-to-RS-232 adapter needed for modern computers
- Protocol reverse engineering required due to documentation errors
- Custom web interface for live profiling and caliber control
- Measurement artifacts: spikes during automatic range changes (filterable in software), glitches every 500 samples
- Example measurements: Shelly plug consumption (2W standby), 40W light bulb, MacBook Pro standby (2.4W)
- Manual range locking recommended to avoid artifacts
- Price: ~1000€ new, >200€ used; old discontinued equipment
- Use cases: standby consumption measurement, devices oscillating between two ranges

### mesurer-la-consommation-avec-un-wattmetre-usb
**Title:** Mesurer la consommation avec un wattmètre USB-C AVHzY C3
**Summary:** Guide to using the AVHzY C3 USB-C power meter for precise profiling of USB-powered devices. Features high sampling rate (1kHz) and ability to measure devices up to 240W.
**Key points:**
- AVHzY C3 USB-C power meter with color display (around 60€)
- Measures voltage, current, power, cumulative energy, cable resistance in real-time
- Intercalates between USB-C charger and device
- Very high precision: 1 kHz sampling rate (1000 samples/second), 0.0001V and 0.0001A resolution
- Max power: 240W (suitable for laptops, not just phones)
- Custom Node.js script for data collection (protocol reverse-engineered from Windows software)
- HTTP server provides live visualization in browser
- Can zoom to fraction of second to see oscillations/details
- Export to CSV or Firefox Profiler JSON format
- Use cases: continuously powered USB devices, battery-powered devices charging, measuring software consumption on phones (requires 100% battery first)
- Also sold under names: YK-Lab Korona YK003C, Shizuku YK001, Power-Z KT002, ATORCH UT18, HELPERS LAB XB001A
- Example profile: USB ring light with 3 brightness levels showing <40ms oscillations

### multiprises
**Title:** Toutes les multiprises ne se valent pas
**Summary:** Safety investigation comparing a dangerous cheap power strip with a quality Legrand model after an electrical incident. Includes detailed teardown photos showing critical design differences.
**Key points:**
- Real incident: differential breaker tripped when plugging in battery charger
- Root cause: cheap power strip with broken plastic tabs holding ground plate
- Extremely dangerous: ground plate touched only phase line, not both (phase + neutral)
- Result: ground pins became live at phase voltage - only protected by differential breaker
- Cheap design: tiny plastic tabs broke easily when plug inserted backward
- Quality Legrand comparison shows proper design:
  - Ground plate physically separated from phase/neutral by plastic blocks
  - Spring-loaded shutters instead of flexible plastic
  - Reinforcements prevent ground pins from moving
  - No possible short circuit regardless of force applied
- Conclusion: Cheap power strips can be life-threatening, quality brands worth the cost
- Power strips look similar externally but very different internally

### presentation-au-FOSDEM2024
**Title:** Présentation au FOSDEM sur l'utilisation du Firefox Profiler pour profiler l'énergie de ma maison
**Summary:** Conference presentation (25 minutes) at FOSDEM 2024 explaining how the Firefox Profiler is used to visualize power consumption of different electrical appliances in the house. Includes embedded video of the talk.
**Key points:**
- FOSDEM is a major open source software gathering held annually in February in Brussels
- Presentation given in the energy-focused devroom: "Energy: Reimagining this Ecosystem through Open Source"
- Demonstrates practical use of Firefox Profiler for home energy monitoring
- Video available with YouTube embed
- 25-minute conference talk

### quelle-puissance-mesurer
**Title:** Quelle puissance mesurer ?
**Summary:** Educational article clarifying the relationship between power and consumption, explaining different types of power measurements (average, maximum, median) and when each is relevant for understanding energy usage.
**Key points:**
- Power vs Consumption:
  - Power (Watts): electrical force at a given instant
  - Consumption (Wh/kWh): energy quantity used over time, what you pay for
  - Example: 1 Wh = 1W for 1h = 60W for 1min = 3.6kW for 1s
  - Note: Wh is "Watts during an hour", not "Watts per hour"
- Average power: energy consumed divided by time elapsed
  - Use when calculating usage cost (e.g., leaving light on)
- Maximum power: peak measured at brief instant
  - Typically at motor startup (fridge, freezer)
  - Important for: electrical installation sizing, subscription power, cable sizing
  - Critical for off-grid (solar + battery, generator)
  - Less critical for optimizing solar self-consumption
- Median power: middle value when sorted
  - Useful when startup power very different from steady-state
- Example 1 - Freezer: huge difference between median/average/max, average not close to any graph value
- Example 2 - Microwave defrost mode: on/off cycles (heats few seconds, pauses, repeats)
  - Average power matches what food packages indicate (e.g., 600W)
  - Maximum power is what solar installation must provide
  - Median not very useful here

### linky-teleinfo-historique
**Title:** Mesurer la consommation avec la Télé-Information Client d'un compteur Linky en mode « historique »
**Summary:** Article documenting the capabilities and limitations of using the Linky meter's TIC (Télé-Information Client) output in "historical" mode for power measurements, including real measurement examples and detailed analysis of what works and what doesn't.
**Key points:**
- Linky TIC output transmits continuous data: apparent power (VA), current (A), energy index (Wh)
- Historical mode: 1200 baud, frames every ~1.5 seconds, 10 VA resolution on apparent power
- Standard mode: 9600 baud, includes injected power for PV installations (requires utility request)
- Hardware: USB TIC adapter (~25€, e.g., GCE Electronics TELEINFO USB module)
- Software: Custom Node.js application, exports to Firefox Profiler format
- Three key values in frames:
  - PAPP: apparent power in VA (rounded to 10 VA)
  - BASE: energy index in 1 Wh increments (what's billed)
  - IINST: current in integer amperes
- Major limitations:
  - Apparent power (VA) ≠ active power (W) - can't track actual billed consumption accurately
  - BASE has low precision: 1 Wh increments + fixed 1.5s sampling = artificial peaks in active power graph
  - Can't isolate individual appliances - only whole-house consumption
  - Completely unsuitable for PV self-consumption: displays 0 when production > consumption
  - No voltage information in historical mode
  - IINST resolution too coarse (~230W per ampere)
- Valid use cases:
  - Overall daily consumption profile for whole house
  - Detecting anomalies (devices left on)
  - Validating subscribed power level
  - General trends for large consumers (heating, water heater) when isolated
- Not suitable for:
  - Low power devices (<100W)
  - Multiple simultaneous appliances
  - Fast variations (<1 second)
  - PV self-consumption analysis
