"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Wifi, Radio, Settings, Zap, ArrowDown, Check, X, Info } from "lucide-react"

// Section header images (served from /public/assets)
const wirelessRadioImg = "/assets/wireless-radio.jpg"
const antennaDishImg = "/assets/antenna-dish.jpg"
const networkSwitchImg = "/assets/network-switch.jpg"
const powerSolutionImg = "/assets/power-solution.jpg"

// ============== DATA ==============
const productDetails: Record<string, { description: string; features: string[]; specs?: Record<string, string> }> = {
  "OXB5-25 / OXB6-25": {
    description: "An Integrated antenna subscriber terminal unit optimized for middle-to-long range (15-20 km). It features high-performance SU-MIMO 2x2 radio technology and QAM1024 modulation.",
    features: ["25 dBi dual-pol integrated antenna (8x8°)", "Throughput up to 2.1 Gbps in 160 MHz", "Built-in router and L2/L3 firewall", "IP66/IP67 ingress protection"],
    specs: { "Frequency": "4900-6060 MHz / 6000-7100 MHz", "Max TX Power": "27 dBm", "Power Consumption": "Up to 30W", "Weight": "2.3 kg" }
  },
  "OXB5-28 / OXB6-28": {
    description: "A long-range (25+ km) integrated antenna subscriber terminal. Designed for high-capacity backhaul and last-mile access with narrow beamwidth for interference rejection.",
    features: ["28 dBi dual-pol integrated antenna (5x5°)", "Supports 20/40/80/160 MHz channels", "MAC/IP filtering & IP tunneling", "Adaptive TDMA air protocol"],
    specs: { "Frequency": "4900-6060 MHz / 6000-7100 MHz", "Dimensions": "600 x 600 x 68 mm", "Weight": "5.8 kg", "Consumption": "30W" }
  },
  "OXB5-E / OXB6-E": {
    description: "Connectorized external antenna unit for 30+ km distances. The most compact model in the XB series, allowing for flexible antenna selection.",
    features: ["2x N-type connectors for external dishes", "Up to 2.1 Gbps throughput", "Ultra-compact and lightweight (1.2 kg)", "Full L2/L3 networking suite"],
    specs: { "Frequency": "4.9-7.1 GHz", "Connectors": "2x N-type (F)", "Weight": "1.2 kg", "Throughput": "2.1 Gbps" }
  },
  "NXG5-bSBS": {
    description: "A carrier-grade 5 GHz base station sector unit with integrated beamforming. Optimized for high-density PTMP deployments.",
    features: ["21 dBi Beamforming (20° Az-steerable)", "Up to 800 Mbps aggregate throughput", "Supports 17 priority QoS queues", "Built-in spectrum analyzer"],
    specs: { "Frequency": "4900-6050 MHz", "Interfaces": "1x GbE, SFP, SYNC", "Max Range": "30 km", "Consumption": "35W" }
  },
  "NXG5-eSBS": {
    description: "Connectorized base station for very long-range PTMP sectors (40+ km). High transmit power and external antenna flexibility.",
    features: ["2x N-type connectors", "27 dBm high transmit power", "Up to 800 Mbps aggregate capacity", "Sync port for TDD synchronization"],
    specs: { "Range": "40+ km", "TX Power": "27 dBm", "Interfaces": "GbE, SFP, SYNC", "Weight": "2.2 kg" }
  },
  "NXG5-iSBS": {
    description: "Integrated sector base station for ranges up to 20 km. Efficient and compact design for rapid deployment.",
    features: ["16 dBi dual-pol 90° antenna", "Up to 800 Mbps capacity", "Low power consumption (20W)", "Carrier-grade QoS and security"],
    specs: { "Antenna": "16 dBi 90x8°", "Range": "20 km", "Consumption": "20W", "Frequency": "4.9-6.0 GHz" }
  },
  "NXG5-ST18": {
    description: "High-performance subscriber terminal for short-to-medium range (up to 10 km). Features Adaptive TDMA protocol.",
    features: ["18 dBi integrated antenna", "Up to 670 Mbps throughput", "Adaptive TDMA air protocol", "Pseudo-radio interface support"],
    specs: { "Range": "10 km", "Frequency": "4.9-6.4 GHz", "Gain": "18 dBi", "Modulation": "OFDM 64/128" }
  },
  "NXG5-ST25": {
    description: "Medium-range subscriber terminal for distances up to 15 km. IP66/67 rated for harsh environments.",
    features: ["25 dBi integrated antenna", "Up to 670 Mbps throughput", "Low power consumption (15W)", "IP66/IP67 ingress protection"],
    specs: { "Range": "15 km", "Consumption": "15W", "Gain": "25 dBi", "Frequency": "4.9-6.4 GHz" }
  },
  "NXG5-ST28": {
    description: "Long-range subscriber terminal (25+ km) with narrow beamwidth for superior interference rejection.",
    features: ["28 dBi integrated antenna", "5x5° narrow beamwidth", "Up to 670 Mbps throughput", "High-gain performance"],
    specs: { "Range": "25+ km", "Gain": "28 dBi", "Beamwidth": "5x5°", "Throughput": "670 Mbps" }
  },
  "NXG5-STE": {
    description: "Connectorized subscriber terminal for extreme distances (30+ km) using large external dish antennas.",
    features: ["2x N-type connectors", "Up to 670 Mbps throughput", "Supports 3rd party antenna integration", "Adaptive TDMA protocol"],
    specs: { "Range": "30+ km", "Connectors": "2x N-type (F)", "Throughput": "670 Mbps", "Frequency": "4.9-6.4 GHz" }
  },
  "O4-E": {
    description: "4 GHz PTP specialist for extreme long-range backhauls (200+ km). High sensitivity and granular channel widths.",
    features: ["200+ km extreme range", "Net throughput up to 650 Mbps", "Receiver sensitivity down to -101 dBm", "4000-5000 MHz operating range"],
    specs: { "Frequency": "4.0-5.0 GHz", "Range": "200+ km", "Sensitivity": "-101 dBm", "Throughput": "650 Mbps" }
  },
  "O5-E": {
    description: "5 GHz PTP specialist for extreme long-range backhauls (200+ km). Features Instant DFS for hitless channel changes.",
    features: ["200+ km extreme range", "Instant DFS background monitoring", "650 Mbps net throughput", "Carrier-grade reliability"],
    specs: { "Frequency": "4.9-6.0 GHz", "Range": "200+ km", "Connectors": "2x N-type (F)", "Throughput": "650 Mbps" }
  },
  "OS-MP8G2S": {
    description: "Intelligent PoE access switch based on the TROS™ platform. Fanless design for silent operation in carrier and enterprise environments.",
    features: ["8x Gigabit PoE+ ports (802.3af/at)", "2x Gigabit SFP uplink ports", "ERPS Ring protection (<50ms recovery)", "Zero Touch Provisioning (ZTP)"],
    specs: { "Backplane": "20 Gbps", "PoE Budget": "140W", "Management": "CLI, Web, SSH, SNMP", "Installation": "Desktop/Rack" }
  },
  "OS-MP16G4S": {
    description: "Medium-density managed PoE switch with 16 Gigabit ports and 4 SFP uplinks. Ideal for distribution layers.",
    features: ["16x Gigabit PoE+ ports", "4x Gigabit SFP uplink ports", "Smart cooling fan system", "Full TROS™ software feature set"],
    specs: { "Backplane": "56 Gbps", "PoE Budget": "240W", "Management": "TROS™ Platform", "Mounting": "19-inch Rack" }
  },
  "OS-MP24G4S": {
    description: "High-density fanless managed PoE switch. Provides silent, reliable power for large-scale deployments.",
    features: ["24x Gigabit PoE+ ports", "4x Gigabit SFP ports", "Silent fanless design", "High 370W PoE budget"],
    specs: { "Backplane": "56 Gbps", "PoE Budget": "370W", "Cooling": "Fanless", "Management": "CLI/Web/SNMP" }
  },
  "OS-MP24G4SC": {
    description: "Versatile 24-port PoE switch with 4 Combo (RJ45/SFP) ports for maximum uplink flexibility.",
    features: ["24x Gigabit PoE+ ports", "4x Gigabit Combo ports", "Smart cooling fan", "370W PoE power budget"],
    specs: { "Backplane": "56 Gbps", "PoE Budget": "370W", "Interfaces": "24x RJ45 + 4x Combo", "Management": "TROS™" }
  },
  "OPS-48V-1.25A": {
    description: "High-efficiency 48V DC power supply designed for Network Orbiter wireless radios and small access points.",
    features: ["Stable 48V output", "Over-voltage & Short-circuit protection", "Wide input voltage range", "Compact form factor"],
    specs: { "Output": "48 VDC, 1.25 A", "Input": "100-240 VAC", "Efficiency": ">85%", "Connector": "DC Jack / Terminal Block" }
  },
  "OPS-56V-2.5A": {
    description: "High-power 56V DC supply for heavy-duty network switches and high-capacity backhaul units.",
    features: ["56V High-power output", "88% energy efficiency", "Industrial-grade reliability", "Built-in surge protection"],
    specs: { "Output": "56 VDC, 2.5 A", "Input": "100-240 VAC", "Efficiency": ">88%", "Power": "140W" }
  },
  "PAS-ADC-48-21-1G": {
    description: "Universal input single-port PoE injector providing reliable power for carrier-grade outdoor units.",
    features: ["Wide input range (AC & DC)", "Gigabit Ethernet data rates", "Comprehensive electrical protections", "Low leakage current (<1mA)"],
    specs: { "Rated Power": "48V, 21W", "AC Input": "90-300 VAC", "DC Input": "36-72 VDC", "Interface": "10/100/1000 Mbps" }
  },
  "OANT30-6SD-C": {
    description: "2 ft MIMO Solid Dish Antenna designed for high-performance point-to-point wireless links.",
    features: ["30 dBi high gain", "Solid aluminum construction", "Excellent front-to-back ratio", "Broadband 4.9-7.125 GHz support"],
    specs: { "Frequency": "4.9-7.125 GHz", "Gain": "30 dBi", "Diameter": "0.6 m", "Connector": "Connectorized" }
  },
  "OANT34-6MH-C": {
    description: "3 ft Mesh Pizza Dish antenna with a modular detachable design for easy transportation.",
    features: ["34 dBi high gain", "Detachable 6-piece reflector", "Lightweight mesh construction", "Dual-polarized MIMO support"],
    specs: { "Frequency": "4.9-7.1 GHz", "Gain": "34 dBi", "Diameter": "0.9 m", "Weight": "Lightweight" }
  },
  "OANT36-4MH-C": {
    description: "4 ft high-gain Mesh Dish antenna. The highest gain in the series for extreme distance links.",
    features: ["36.5 dBi peak gain", "Detachable 4-piece design", "4.9-7.125 GHz broadband support", "Robust 13 kg construction"],
    specs: { "Gain": "36.5 dBi", "Frequency": "4.9-7.125 GHz", "Diameter": "1.2 m", "Weight": "13 kg" }
  },
  "EMS NEXT": {
    description: "Next-generation Element Management System for centralized network orchestration.",
    features: ["Full network visibility", "Remote diagnostics", "Automated backups", "Inventory management"],
    specs: { "Deployment": "Cloud / On-Premise", "Protocol": "SNMP, SSH, HTTPs", "OS Support": "Linux / Windows" }
  },
  "TROS™ Platform": {
    description: "The advanced software foundation for Network Orbiter switches, delivering carrier-grade features and management.",
    features: ["L2/L3 feature rich", "Advanced security modules", "Intelligent PoE management", "Industry standard CLI"],
    specs: { "Platform": "TROS™", "Reliability": "99.999%", "Management": "Unified" }
  }
}

const sections = [
  { id: "wireless-systems", label: "Wireless Systems", icon: Wifi, number: "1.0" },
  { id: "antennas", label: "Antennas", icon: Radio, number: "2.0" },
  { id: "network-switches", label: "Network Switches", icon: Settings, number: "3.0" },
  { id: "power-solutions", label: "Power Solutions", icon: Zap, number: "4.0" },
  { id: "software-tools", label: "Software Tools", icon: Settings, number: "5.0" },
]

// ============== COMPONENTS ==============

const SectionHeader: React.FC<{
  number: string
  title: string
  description?: string
  image?: string
}> = ({ number, title, description, image }) => (
  <div className="mb-10">
    {image && (
      <div className="relative mb-8 rounded-2xl overflow-hidden gradient-border">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        <img
          src={image}
          alt={title}
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="flex items-center gap-4">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-xl backdrop-blur-sm border font-bold text-lg"
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.15)",
                borderColor: "rgba(34, 197, 94, 0.3)",
                color: "#22c55e",
              }}
            >
              {number}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              <span style={{ color: "#22c55e", textShadow: "0 0 10px rgba(34, 197, 94, 0.2)" }}>
                {title}
              </span>
            </h2>
          </div>
        </div>
      </div>
    )}
    {!image && (
      <div className="flex items-center gap-4 mb-4">
        <span
          className="flex items-center justify-center w-12 h-12 rounded-xl border font-bold text-lg"
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            borderColor: "rgba(34, 197, 94, 0.2)",
            color: "#22c55e",
          }}
        >
          {number}
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          <span style={{ color: "#22c55e", textShadow: "0 0 10px rgba(34, 197, 94, 0.2)" }}>
            {title}
          </span>
        </h2>
      </div>
    )}
    {description && (
      <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
        {description}
      </p>
    )}
  </div>
)

const SubsectionTitle: React.FC<{
  number: string
  title: string
  description?: string
}> = ({ number, title, description }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-sm font-mono font-semibold" style={{ color: "#22c55e" }}>
        {number}
      </span>
      <h3 className="text-xl md:text-2xl font-semibold text-foreground">
        <span style={{ color: "#22c55e", textShadow: "0 0 8px rgba(34, 197, 94, 0.15)" }}>
          {title}
        </span>
      </h3>
    </div>
    {description && (
      <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
        {description}
      </p>
    )}
    <div
      className="mt-3 h-px w-full"
      style={{ background: "linear-gradient(to right, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.1), transparent)" }}
    />
  </div>
)

const ProductCard: React.FC<{
  title: string
  subtitle?: string
  description: string
  features?: string[]
  icon?: "wireless" | "antenna" | "switch" | "power"
  highlight?: string
}> = ({ title, subtitle, description, features, icon = "wireless", highlight }) => {
  const iconMap = { wireless: Wifi, antenna: Radio, switch: Settings, power: Zap }
  const IconComponent = iconMap[icon]

  return (
    <div className="group relative gradient-border rounded-xl p-6 bg-card hover:bg-secondary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:-translate-y-1">
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to bottom right, rgba(34, 197, 94, 0.05), transparent)" }}
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          {highlight && (
            <span
              className="px-3 py-1 text-xs font-medium rounded-full border"
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                color: "#22c55e",
                borderColor: "rgba(34, 197, 94, 0.2)",
              }}
            >
              {highlight}
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
        {features && features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="w-1.5 h-1.5 mt-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#22c55e" }} />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const SpecTable: React.FC<{
  title: string
  headers: string[]
  rows: string[][]
  compact?: boolean
  onRowClick?: (modelName: string, rowData: string[], headers: string[]) => void
}> = ({ title, headers, rows, compact = false, onRowClick }) => (
  <div className="gradient-border rounded-xl overflow-hidden bg-card">
    <div className="px-6 py-4 border-b border-border" style={{ backgroundColor: "rgba(34, 197, 94, 0.05)" }}>
      <h4 className="text-lg font-semibold text-foreground">
        <span style={{ color: "#22c55e", textShadow: "0 0 8px rgba(34, 197, 94, 0.15)" }}>{title}</span>
      </h4>
    </div>
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border" style={{ backgroundColor: "rgba(34, 197, 94, 0.08)" }}>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`text-left text-xs font-semibold uppercase tracking-wider text-foreground/80 ${compact ? "px-4 py-3" : "px-6 py-4"}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`group border-b border-border/50 last:border-0 ${onRowClick ? "cursor-pointer hover:bg-primary/5" : ""}`}
              onClick={() => onRowClick?.(row[0], row, headers)}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`text-sm text-foreground/90 transition-colors duration-200 ${compact ? "px-4 py-3" : "px-6 py-4"} ${cellIndex === 0 ? "font-medium" : ""}`}
                  style={cellIndex === 0 ? { color: "#22c55e" } : {}}
                >
                  <div className="flex items-center gap-2">
                    {cell}
                    {cellIndex === 0 && onRowClick && (
                      <Info className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#22c55e" }} />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const FeatureList: React.FC<{ title: string; features: string[]; columns?: 1 | 2 | 3 }> = ({
  title,
  features,
  columns = 2,
}) => {
  const gridCols = { 1: "grid-cols-1", 2: "grid-cols-1 md:grid-cols-2", 3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" }
  return (
    <div className="gradient-border rounded-xl p-6 bg-card">
      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-1 h-6 rounded-full" style={{ backgroundColor: "#22c55e" }} />
        {title}
      </h4>
      <ul className={`grid ${gridCols[columns]} gap-3`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-foreground/80">
            <span
              className="flex items-center justify-center w-5 h-5 mt-0.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}
            >
              <Check className="w-3 h-3" />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

const ProductDetailModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  modelName: string | null
  tableData?: { headers: string[]; row: string[] }
}> = ({ isOpen, onClose, modelName, tableData }) => {
  const [mounted, setMounted] = useState(false)

  /* -----------------------------------------
     Wait until hydration is complete
  ------------------------------------------ */
  useEffect(() => {
    setMounted(true)
  }, [])

  /* -----------------------------------------
     Scroll Lock (Next.js safe)
  ------------------------------------------ */
  useEffect(() => {
    if (!mounted || !isOpen) return

    const body = document.body
    const html = document.documentElement
    const scrollY = window.scrollY

    const bodyStyle = body.style.cssText
    const htmlStyle = html.style.cssText

    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"
    body.style.overflow = "hidden"
    html.style.overflow = "hidden"

    return () => {
      body.style.cssText = bodyStyle
      html.style.cssText = htmlStyle
      window.scrollTo(0, scrollY)
    }
  }, [isOpen, mounted])

  if (!mounted || !isOpen || !modelName) return null

  const details = productDetails[modelName] || {
    description: tableData
      ? `The ${modelName} is a high-performance ${
          tableData.row[1]?.toLowerCase() || "networking component"
        } designed for carrier-grade deployments. It features ${
          tableData.row[3] || "advanced technical specifications"
        } and is optimized for ${
          tableData.row[2] || "professional network environments"
        }.`
      : "Detailed specifications for this product are currently being updated.",
    features: [
      "Carrier-grade reliability",
      "Network Orbiter verified quality",
      "Full technical support",
    ],
    specs: {},
  }

  const combinedSpecs: Record<string, string> = { ...details.specs }

  if (tableData) {
    tableData.headers.forEach((header, index) => {
      if (index > 0) combinedSpecs[header] = tableData.row[index]
    })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b border-border"
          style={{ backgroundColor: "rgba(34,197,94,0.05)" }}
        >
          <div>
            <h3 className="text-2xl font-bold text-foreground" style={{ color: "#22c55e" }}>
              {modelName}
            </h3>
            <p className="text-sm text-muted-foreground">
              Product Preview & Details
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto overscroll-contain">
          <div className="mb-6">
            <h4 className="text-sm uppercase text-muted-foreground mb-2">
              Overview
            </h4>
            <p className="leading-relaxed">{details.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm uppercase text-muted-foreground mb-2">
                Features
              </h4>
              <ul className="space-y-2">
                {details.features.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase text-muted-foreground mb-2">
                Technical Specs
              </h4>

              {Object.keys(combinedSpecs).length ? (
                Object.entries(combinedSpecs).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between border-b py-1 text-sm"
                  >
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  Additional specs coming soon.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-green-500 text-black font-semibold hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}


const ProductsNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState("wireless-systems")

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }))
      for (const section of sectionElements.reverse()) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      if (hash) scrollToSection(hash)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("hashchange", handleHashChange)
    handleHashChange()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <nav className="sticky z-40 bg-background/80 backdrop-blur-xl border-b border-border" style={{ top: "var(--header-h, 80px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="font-semibold" style={{ color: "#22c55e" }}>
            Products
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
            {sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
                    isActive
                      ? ""
                      : "text-muted-foreground border-border hover:text-foreground hover:bg-secondary/40"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: "rgba(34, 197, 94, 0.12)",
                          color: "#22c55e",
                          borderColor: "rgba(34, 197, 94, 0.3)",
                        }
                      : {}
                  }
                >
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

const ProductsHero: React.FC = () => (
  <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at top, rgba(34, 197, 94, 0.12) 0%, transparent 50%)" }}
    />
    <div
      className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
      style={{ backgroundColor: "rgba(34, 197, 94, 0.08)" }}
    />
    <div
      className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse-glow"
      style={{ backgroundColor: "rgba(20, 184, 166, 0.08)", animationDelay: "1.5s" }}
    />
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-8 text-sm text-muted-foreground">
        <span>Home</span>
        <span>/</span>
        <span className="font-medium" style={{ color: "#22c55e" }}>
          Products
        </span>
      </div>
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-2xl blur-xl animate-pulse-glow"
            style={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
          />
          <div
            className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(to bottom right, #22c55e, #14b8a6)" }}
          >
            <Wifi className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
        <span className="text-foreground">Network Orbiter</span>
        <br />
        <span style={{ color: "#22c55e", textShadow: "0 0 12px rgba(34, 197, 94, 0.2)" }}>
          Product Portfolio
        </span>
      </h1>
      <p
        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        High-performance wireless hardware and networking solutions for WISPs, carriers, and enterprise networks.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        {[
          { value: "2.1", unit: "Gbps", label: "Max Throughput" },
          { value: "200+", unit: "km", label: "Range" },
          { value: "800", unit: "Mbps", label: "PTMP Capacity" },
          { value: "370", unit: "W", label: "PoE Budget" },
        ].map((stat) => (
          <div key={stat.label} className="gradient-border rounded-xl p-4 bg-card/50">
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: "#22c55e" }}>
              {stat.value}
              <span className="text-lg text-muted-foreground ml-1">{stat.unit}</span>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto" />
      </div>
    </div>
  </section>
)

// ============== SECTIONS ==============

const WirelessSystemsSection: React.FC<{ onProductClick: (model: string) => void }> = ({ onProductClick }) => (
  <section id="wireless-systems" className="py-16 border-b border-border">
    <SectionHeader
      number="1.0"
      title="High-Performance Wireless Systems"
      description="Form the backbone for everything from last-mile subscriber access to long-range backhauling between network nodes."
      image={wirelessRadioImg}
    />

    <div id="orbiter-xb-series" className="mb-16">
      <SubsectionTitle
        number="1.1"
        title="ORBITER XB Series"
        description="Next-generation point-to-point solutions with throughput up to 2.1 Gbps."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ProductCard
          icon="wireless"
          title="2.1 Gbps Throughput"
          description="Groundbreaking wireless performance in 160 MHz channels"
          highlight="160 MHz"
        />
        <ProductCard
          icon="wireless"
          title="Integrated Router"
          description="Built-in router eliminates need for separate SOHO equipment"
          highlight="All-in-One"
        />
        <ProductCard
          icon="wireless"
          title="QAM1024 Modulation"
          description="Expanded coding schemes for high-interference environments"
          highlight="Robust"
        />
        <ProductCard
          icon="wireless"
          title="Built-in Security"
          description="Firewall, MAC/IP filtering, and SSH access included"
          highlight="Secure"
        />
      </div>

      <SpecTable
        title="ORBITER XB Series Technical Specifications"
        headers={["Model", "Description", "Distance", "Antenna", "Interfaces", "Dimensions"]}
        onRowClick={onProductClick}
        rows={[
          ["OXB5-25 / OXB6-25", "Integrated antenna STU", "15-20 km", "25 dBi dual-pol (8x8°)", "Combo 1x GbE + 1x SFP", "350×350×71.5 mm"],
          ["OXB5-28 / OXB6-28", "Integrated antenna STU", "25+ km", "28 dBi dual-pol (5x5°)", "Combo 1x GbE + 1x SFP", "600×600×68 mm"],
          ["OXB5-E / OXB6-E", "External antenna STU", "30+ km", "2× N-type connectors", "Combo 1x GbE + 1x SFP", "188×190×86 mm"],
        ]}
      />

      <div className="mt-6">
        <FeatureList
          title="Advanced Radio & Networking Features"
          features={[
            "SU-MIMO 2x2 with Polling duplex method",
            "Automatic Bitrate Control & Transmit Power Control",
            "Voice/RTP Aware Superpacketing for VoIP",
            "Built-in spectrum analyzer & DFS/Radar detection",
            "Ethernet-over-IP and IP-over-IP tunneling",
            "Full L2 switch and L2/L3 firewall",
          ]}
          columns={2}
        />
      </div>
    </div>

    <div id="orbiter-nxg-series" className="mb-16">
      <SubsectionTitle
        number="1.2"
        title="Orbiter NXG Series"
        description="Flexible devices for PTP and PTMP deployments with up to 800 Mbps aggregate throughput."
      />

      <h4 className="text-lg font-semibold mb-4 mt-8" style={{ color: "#22c55e" }}>
        NXG5 Base Station Sectors
      </h4>
      <SpecTable
        title="Base Station Models"
        headers={["Model", "Throughput", "Antenna", "Distance", "Key Feature"]}
        onRowClick={onProductClick}
        rows={[
          ["NXG5-bSBS", "Up to 800 Mbps (80 MHz)", "21 dBi Beamforming (20° Az-steerable)", "Up to 30 km", "L2/L3 Firewall, OSPFv2, 17 QoS Queues"],
          ["NXG5-eSBS", "Up to 800 Mbps (80 MHz)", "2× N-type (External)", "40+ km", "Compact ODU (2.2 kg), 27 dBm TX Power"],
          ["NXG5-iSBS", "Up to 800 Mbps (80 MHz)", "16 dBi Integrated (90°)", "Up to 20 km", "Low power consumption (20W)"],
        ]}
      />

      <h4 className="text-lg font-semibold mb-4 mt-8" style={{ color: "#22c55e" }}>
        NXG5 & NXG6 Subscriber Terminals
      </h4>
      <SpecTable
        title="Subscriber Terminal Models"
        headers={["Model", "Frequency", "Throughput", "Antenna", "Distance", "Key Specs"]}
        onRowClick={onProductClick}
        rows={[
          ["NXG5-ST18", "4900-6425 MHz", "Up to 670 Mbps", "18 dBi Integrated", "Up to 10 km", "Adaptive TDMA, Pseudo-radio mode"],
          ["NXG6-18", "6000-7100 MHz", "Up to 670 Mbps", "18 dBi Integrated", "Up to 10 km", "MIMO 2x2 OFDM, L2/L3 Routing"],
          ["NXG5-ST25", "4900-6425 MHz", "Up to 670 Mbps", "25 dBi Integrated", "Up to 15 km", "IP66/67 Rated, 15W Consumption"],
          ["NXG5-ST28", "4900-6425 MHz", "Up to 670 Mbps", "28 dBi Integrated", "25+ km", "High-gain 5x5° Beamwidth"],
          ["NXG5-STE", "4900-6425 MHz", "Up to 670 Mbps", "External (2x N-type)", "30+ km", "Supports long-range dish antennas"],
        ]}
      />
    </div>

    <div>
      <SubsectionTitle
        number="1.3"
        title="Orbiter O4 & O5 Series"
        description="Purpose-built for extreme long-range PTP links, delivering reliable high-capacity backhaul over 200+ km."
      />
      <SpecTable
        title="O-Series Model Comparison"
        headers={["Model", "Frequency", "Antenna", "Distance", "Interfaces"]}
        onRowClick={onProductClick}
        rows={[
          ["O4-E", "4000-5000 MHz", "External (2× N-type)", "200+ km", "1x Combo GbE/SFP"],
          ["O5-18", "4900-6000 MHz", "18 dBi integrated", "Up to 20 km", "1x Gigabit Ethernet"],
          ["O5-23", "4900-6000 MHz", "23 dBi integrated", "Up to 40 km", "1x Combo GbE/SFP"],
          ["O5-25", "4900-6000 MHz", "25 dBi integrated", "Up to 60 km", "1x Combo GbE/SFP"],
          ["O5-28", "4900-6000 MHz", "28 dBi integrated", "Up to 80 km", "1x Combo GbE/SFP"],
          ["O5-E", "4900-6000 MHz", "External (2× N-type)", "200+ km", "1x Combo GbE/SFP"],
        ]}
      />

      <div className="mt-6">
        <FeatureList
          title="Key Technological Advantages"
          features={[
            "Instant DFS: Hitless channel changes with background spectrum monitoring",
            "Automatic Bitrate Control (ABC) for dynamic optimization",
            "Integrated full-fledged L2 switch for transparent Ethernet transport",
            "8 priority queues with IEEE 802.1p and IP DiffServ support",
          ]}
          columns={2}
        />
      </div>
    </div>
  </section>
)

const AntennasSection: React.FC<{ onProductClick: (model: string) => void }> = ({ onProductClick }) => (
  <section id="antennas" className="py-16 border-b border-border">
    <SectionHeader
      number="2.0"
      title="High-Performance Antennas"
      description="A comprehensive collection of high-gain dish, mesh, and omni-directional antennas designed to support a wide array of deployment scenarios."
      image={antennaDishImg}
    />

    <div className="mb-12">
      <SubsectionTitle
        number="2.1"
        title="Parabolic Dish & Mesh Antennas"
        description="High-gain, highly directional antennas ideal for Point-to-Point connections and long-range backhaul."
      />
      <SpecTable
        title="Antenna Specifications"
        headers={["Model", "Description", "Frequency", "Gain", "Diameter", "Connector"]}
        onRowClick={onProductClick}
        rows={[
          ["OANT-4G-28-MH", "Mesh Dish Antenna", "4.4-5.0 GHz", "28 ±1 dBi", "0.6 m", "N Male/Female"],
          ["OANT-4G-30-MH", "Mesh Dish Antenna", "4.4-5.0 GHz", "30 ±1 dBi", "0.9 m", "N Male/Female"],
          ["OANT30-6SD-C", "2 ft MIMO Solid Dish", "4.9-7.125 GHz", "30 dBi", "0.6 m", "Connectorized"],
          ["OANT30-MH-C", "2 ft MIMO Mesh Dish", "4.9-7.125 GHz", "30 dBi", "0.6 m", "Connectorized"],
          ["OANT30-SD-C", "2 ft Solid Dish Antenna", "4.9-7.125 GHz", "30 dBi", "0.6 m", "Connectorized"],
          ["OANT34-6MH-C", "3 ft Mesh Pizza Dish", "4.9-7.125 GHz", "34 dBi", "0.9 m", "2× N-Female"],
          ["OANT36-4MH-C", "4 ft Mesh Dish Antenna", "4.9-7.125 GHz", "36 dBi", "1.2 m", "2× N-Male/Female"],
          ["OANT-11G35D", "2 ft Parabolic Pizza", "10-11.7 GHz", "35 dBi", "0.6 m", "Waveguide"],
        ]}
      />
    </div>

    <div>
      <SubsectionTitle
        number="2.2"
        title="Omni-directional & Specialized Antennas"
        description="Coverage for PTMP base station deployments and radio-specific compatibility."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          icon="antenna"
          title="OANT-O13D"
          subtitle="Omni-directional Antenna"
          description="4.9-5.8 GHz 13 dBi Omni Antenna Connectorized. Optimized for PTMP Applications."
          features={["360° horizontal coverage", "13 dBi high gain", "MIMO & Dual Slant"]}
        />
        <ProductCard
          icon="antenna"
          title="OANT30-6SD-X"
          subtitle="Mimosa Compatible"
          description="4.9-6.5 GHz 60cm Mimo Dish with 30 dBi High Gain."
          features={["Twist-on Connector", "Compatible with Mimosa B5x/B6x", "Dual Slant (V/H or ±45°)"]}
          highlight="B5x/B6x Ready"
        />
        <ProductCard
          icon="antenna"
          title="OANT34-6MH-X"
          subtitle="Mimosa Compatible"
          description="4.9-6.5 GHz 3-foot Mesh Dish with 34 dBi High Gain."
          features={["Modular Twist-on", "Compatible with Mimosa C5x/B5x", "Lightweight Mesh Design"]}
          highlight="C5x/B5x Ready"
        />
      </div>
    </div>
  </section>
)

const NetworkSwitchesSection: React.FC<{ onProductClick: (model: string) => void }> = ({ onProductClick }) => (
  <section id="network-switches" className="py-16 border-b border-border">
    <SectionHeader
      number="3.0"
      title="Network Switches"
      description="Versatile switching devices with PoE and SFP connectivity for aggregation, distribution, and backhaul."
      image={networkSwitchImg}
    />

    <div className="mb-12">
      <SubsectionTitle
        number="3.1"
        title="Managed PoE Switches (OS-MP Series)"
        description="Intelligent carrier-level switches based on the TROS™ platform for IP MAN and enterprise networks."
      />
      <SpecTable
        title="Managed Switch Portfolio"
        headers={["Model", "Ports", "PoE Budget", "Backplane", "Features"]}
        onRowClick={onProductClick}
        rows={[
          ["OS-MP8G2S", "8× GbE PoE+ + 2× SFP", "140 W", "20 Gbps", "Fanless, ZTP, ISSU support"],
          ["OS-MP16G4S", "16× GbE PoE+ + 4× SFP", "240 W", "56 Gbps", "19-inch rack, Smart Cooling"],
          ["OS-MP24G4S", "24× GbE PoE+ + 4× SFP", "370 W", "56 Gbps", "Fanless, High-density access"],
          ["OS-MP24G4SC", "24× GbE PoE+ + 4× Combo", "370 W", "56 Gbps", "RJ45/SFP Combo ports"],
        ]}
      />

      <div className="mt-6">
        <FeatureList
          title="Advanced Carrier-Grade Features"
          features={[
            "TROS™ Platform: Intelligent PoE management & ZTP",
            "Reliability: <50ms Ring protection (ERPS), LACP, STP/RSTP",
            "Security: DDoS prevention, 802.1x, Port binding, ACL (L2-L7)",
            "QoS: Carrier-level policies with SP, WRR, and SP+WRR algorithms",
            "Management: CLI, Web, SSH, SNMP, Zero Touch Provisioning",
            "Efficiency: Intelligent PoE+ (802.3af/at) with power scheduling",
          ]}
          columns={2}
        />
      </div>
    </div>

    <div className="mb-12">
      <SubsectionTitle
        number="3.2"
        title="Specialized Power Equipment"
        description="Solar-ready switching and high-efficiency power management for remote site deployments."
      />
      <div className="grid md:grid-cols-2 gap-6">
        <ProductCard
          icon="power"
          title="Solar PoE Switch"
          description="Direct 12V solar input support with mixed PoE outputs (60W/30W/Passive)."
          features={["1x 60W PoE, 2x 30W PoE", "2x 48V/24V Auto PoE", "1x Uplink SFP", "Solar Panel Input (<30V)"]}
          highlight="Solar Ready"
        />
        <ProductCard
          icon="power"
          title="Smart Solar Controller"
          description="24/7 continuous power management for CCTV and Telecom sites."
          features={["Lead Acid/Li-Ion Sync", "48 VDC, 30W Ethernet output", "AC Grid & Solar Charging", "Low leakage current <1mA"]}
          highlight="Continuous Power"
        />
      </div>
    </div>
  </section>
)

const PowerSolutionsSection: React.FC<{ onProductClick: (model: string) => void }> = ({ onProductClick }) => (
  <section id="power-solutions" className="py-16">
    <SectionHeader
      number="4.0"
      title="Power Solutions"
      description="PoE injectors and power supplies to reliably energize your wireless radios and network devices."
      image={powerSolutionImg}
    />

    <div className="mb-12">
      <SubsectionTitle
        number="4.1"
        title="PoE Injectors & Power Modules"
        description="High-reliability power injection for wireless radios and network equipment."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ProductCard
          icon="power"
          title="PAS-ADC-48-21-1G"
          subtitle="Universal PoE Injector"
          description="Single port PoE injector providing 48V, 21W Rated Power output."
          features={["90-300 VAC or 36-72 VDC Input", "10/100/1000 Mbps connectivity", "Short circuit & Overload protection"]}
          highlight="Universal Input"
        />
        <ProductCard
          icon="power"
          title="OPOE-60W"
          subtitle="High-Power Injector"
          description="Industrial grade 60W PoE++ for demanding high-capacity backhaul units."
          features={["IEEE 802.3bt compliant", "Gigabit data rates", "Surge protection built-in"]}
          highlight="60W"
        />
        <ProductCard
          icon="power"
          title="OPOE-90W"
          subtitle="Ultra-Power Injector"
          description="90W power delivery for specialized heavy-duty network appliances."
          features={["Up to 90W DC output", "Dual-stage protection", "LED status indicators"]}
          highlight="90W"
        />
      </div>
    </div>

    <div>
      <SubsectionTitle
        number="4.2"
        title="Power Supply Specifications"
        description="DC power options for carrier-grade deployments."
      />
      <SpecTable
        title="DC Power Supplies"
        headers={["Model", "Output Voltage", "Rated Current", "Efficiency", "Input Range"]}
        onRowClick={onProductClick}
        rows={[
          ["OPS-48V-1.25A", "48 VDC", "1.25 A", ">85%", "100-240 VAC"],
          ["OPS-56V-2.5A", "56 VDC", "2.5 A", ">88%", "100-240 VAC"],
          ["OPS-Universal-DC", "12-56 VDC", "Variable", ">90%", "36-72 VDC"],
        ]}
        compact
      />
    </div>
  </section>
)

const SoftwareToolsSection: React.FC<{ onProductClick: (model: string) => void }> = ({ onProductClick }) => (
  <section id="software-tools" className="py-16">
    <SectionHeader
      number="5.0"
      title="Software Tools"
      description="Proprietary monitoring systems and specialized software functions integrated into the networking hardware."
    />

    <div className="mb-12">
      <SubsectionTitle
        number="5.1"
        title="Network Management Systems"
        description="Centralized control and visibility for your entire network infrastructure."
      />
      <div className="grid md:grid-cols-2 gap-6">
        <div 
          className="cursor-pointer" 
          onClick={() => onProductClick("EMS NEXT")}
        >
          <ProductCard
            icon="switch"
            title="EMS NEXT"
            subtitle="Element Management System"
            description="A comprehensive monitoring and management platform for Network Orbiter devices."
            features={[
              "Real-time performance monitoring",
              "Centralized configuration management",
              "Fault detection & alerting",
              "Batch firmware updates",
            ]}
            highlight="Featured Tool"
          />
        </div>
        <div 
          className="cursor-pointer" 
          onClick={() => onProductClick("TROS™ Platform")}
        >
          <ProductCard
            icon="switch"
            title="TROS™ Platform"
            subtitle="Switch Operating System"
            description="Advanced software platform powering the OS-MP series switches."
            features={[
              "Zero Touch Provisioning (ZTP)",
              "Carrier-level QoS algorithms",
              "L2-L7 security mechanisms",
              "ERPS Ring protection (<50ms)",
            ]}
            highlight="Embedded"
          />
        </div>
      </div>
    </div>
  </section>
)

// ============== MAIN ==============
export default function ProductsPage() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedTableData, setSelectedTableData] = useState<{ headers: string[]; row: string[] } | undefined>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProductClick = (modelName: string, rowData?: string[], headers?: string[]) => {
    setSelectedModel(modelName)
    if (rowData && headers) {
      setSelectedTableData({ headers, row: rowData })
    } else {
      setSelectedTableData(undefined)
    }
    setIsModalOpen(true)
  }

  const productsThemeVars = {
    "--background": "#050B10",
    "--foreground": "#E5E7EB",
    "--border": "rgba(255,255,255,0.10)",
    "--muted": "rgba(255,255,255,0.06)",
    "--muted-foreground": "rgba(229,231,235,0.70)",
    "--card": "rgba(255,255,255,0.04)",
    "--secondary": "rgba(255,255,255,0.06)",
    "--secondary-foreground": "#E5E7EB",
    "--primary": "#00FF55",
    "--primary-foreground": "#00204A",
    "--accent": "#19FF8C",
  } as React.CSSProperties

  return (
    <main style={productsThemeVars} className="min-h-screen bg-background text-foreground">
      <ProductsNavigation />
      <ProductsHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WirelessSystemsSection onProductClick={handleProductClick} />
        <AntennasSection onProductClick={handleProductClick} />
        <NetworkSwitchesSection onProductClick={handleProductClick} />
        <PowerSolutionsSection onProductClick={handleProductClick} />
        <SoftwareToolsSection onProductClick={handleProductClick} />
      </div>

      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modelName={selectedModel}
        tableData={selectedTableData}
      />

      <style jsx global>{`
        @keyframes specRowIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .animate-fade-in {
          animation: fadeIn 700ms ease-out both;
        }
        @keyframes pulseGlow {
          0%, 100%   { opacity: 0.55; transform: scale(1);    }
          50%        { opacity: 0.95; transform: scale(1.05); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.8s ease-in-out infinite;
        }
        .gradient-border {
          position: relative;
          border: 1px solid rgba(34, 197, 94, 0.15);
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.05);
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </main>
  )
}
