import type React from 'react';
import { Network, Signal, Route, Waves, Shield, Bolt, Wind, Layers, Server, Settings } from 'lucide-react';

export type SolutionNavItem = {
  id: string;
  navLabel: string;
  navShortText: string;
  pageH1: string;
  headIntro: string;
  overviewExtended: string;
  technicalPoints: string[];
  resiliencePoints: string[];
  strategicAdvantages: { title: string; description: string }[];
  datasheet?: string;
  icon: React.ElementType;
  image: string;
  impactBullets?: string[];
};

export const slugifyNavLabel = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const solutions: SolutionNavItem[] = [
  {
    id: slugifyNavLabel('Mission Criticals'),
    navLabel: 'Mission Criticals',
    navShortText: 'High-capacity wireless links that extend connectivity across rural and remote regions.',
    pageH1: 'Mission-Critical Wireless Connectivity',
    headIntro:
      'Network Orbiter provides long-range rural connectivity using high-performance point-to-point and point-to-multipoint radios designed for extended distances.',
    overviewExtended:
      'In today\'s hyper-connected landscape, Mission-Critical Wireless represents a critical pillar of modern infrastructure. Our approach integrates carrier-grade hardware with intelligent software management to ensure uninterrupted service delivery, even in the most demanding environmental conditions.',
    technicalPoints: [
      'High-gain antenna arrays for extreme range and stability',
      'Advanced interference mitigation and spectrum management',
      'Native compatibility with Point-to-Point (PTP) and Point-to-Multipoint (PTMP) ecosystems'
    ],
    resiliencePoints: [
      'AES-256 encrypted data transmission for top-tier security',
      '99.999% (Five-Nines) carrier-grade reliability for mission-critical loads',
      'Real-time telemetry and AI-driven predictive insights'
    ],
    strategicAdvantages: [
      {
        title: 'Resilient Architecture',
        description: 'Designed to withstand extreme weather and electromagnetic interference, ensuring your mission-critical data always reaches its destination.'
      },
      {
        title: 'Future-Ready Scaling',
        description: 'Easily scale from a single point-to-point link to a massive multi-sector network without replacing your core infrastructure.'
      }
    ],
    icon: Route,
    image: '/assets/mission-critical.jpg',
    impactBullets: [
      'Eliminates rural connectivity gaps without trenching fiber',
      'Supports SCADA, video, and voice on a single resilient link',
      'Designed for 24/7 operation in harsh environments',
    ],
  },
  {
    id: slugifyNavLabel('High-Capacity Last-Mile Access'),
    navLabel: 'High-Capacity Last-Mile Access',
    navShortText: 'Deliver high-speed last-mile connectivity with carrier-grade wireless.',
    pageH1: 'High-Capacity Last-Mile Access Infrastructure',
    headIntro:
      'Carrier-grade Network Orbiter radios deliver wire-speed last-mile connectivity with advanced QoS and low latency.',
    overviewExtended:
      'High-Capacity Last-Mile Access is the cornerstone of modern broadband delivery. We provide a fiber-like experience wirelessly, bridging the gap between core networks and end-users with unprecedented speed and reliability.',
    technicalPoints: [
      'Multi-gigabit throughput capabilities per subscriber sector',
      'Advanced Quality of Service (QoS) for prioritized traffic',
      'Dynamic bandwidth allocation for peak performance'
    ],
    resiliencePoints: [
      'Hardened outdoor enclosures for all-weather operation',
      'Automatic failover and redundant link support',
      'Centralized cloud management for rapid troubleshooting'
    ],
    strategicAdvantages: [
      {
        title: 'Fiber Performance, Wireless Cost',
        description: 'Deploy fiber-grade connectivity at a fraction of the cost and time required for traditional cable trenching.'
      },
      {
        title: 'Rapid Market Entry',
        description: 'Launch new services in weeks rather than months, capturing market share faster than competitors.'
      }
    ],
    icon: Network,
    image: '/assets/last-mile.jpg',
    impactBullets: [
      'Delivers carrier-grade access where fiber is cost-prohibitive',
      'Enables premium service tiers with QoS and low latency',
      'Scales from dozens to hundreds of subscribers per sector',
    ],
  },
  {
    id: slugifyNavLabel('Wi-Fi Backhaul for Public Areas & Parks'),
    navLabel: 'Wi-Fi Backhaul for Public Areas & Parks',
    navShortText: 'Wireless backhaul to support public Wi-Fi in open spaces.',
    pageH1: 'Wi-Fi Backhaul for Public Areas and Parks',
    headIntro:
      'Robust wireless backhaul Orbiter and enable public Wi-Fi in density locations, parks, and distribution networks.',
    overviewExtended:
      'Providing public Wi-Fi in large open spaces requires a robust backhaul foundation. Our solutions provide the high-speed backbone necessary to support hundreds of concurrent users across expansive geographical areas.',
    technicalPoints: [
      'Integrated backhaul and access point management',
      'High-density user support with advanced load balancing',
      'Seamless roaming across large park and campus environments'
    ],
    resiliencePoints: [
      'Tamper-resistant hardware for public installations',
      'Self-healing mesh capabilities for maximum uptime',
      'Remote monitoring and automated system health checks'
    ],
    strategicAdvantages: [
      {
        title: 'Enhanced Public Service',
        description: 'Improve community engagement and public safety by providing reliable connectivity in recreational areas.'
      },
      {
        title: 'Smart City Integration',
        description: 'Lay the groundwork for IoT, environmental sensors, and smart lighting on the same infrastructure.'
      }
    ],
    icon: Waves,
    image: '/assets/antenna-dish.jpg',
    impactBullets: [
      'Backhauls dense public Wi‑Fi without congesting municipal fiber',
      'Maintains performance during high footfall and peak hours',
      'Supports CCTV, public safety, and guest Wi‑Fi from one backbone',
    ],
  },
  {
    id: slugifyNavLabel('Video Surveillance & Public Safety'),
    navLabel: 'Video Surveillance & Public Safety',
    navShortText: 'Wireless infrastructure for surveillance, traffic systems, and public safety networks.',
    pageH1: 'Video Surveillance and Public Safety Infrastructure',
    headIntro:
      'Wireless solutions for video surveillance, traffic monitoring, and public safety networks.',
    overviewExtended:
      'Public safety networks demand absolute reliability and low-latency video streaming. Our infrastructure ensures that first responders and safety systems have the real-time data they need when seconds count.',
    technicalPoints: [
      'Low-latency transmission for real-time 4K video streams',
      'Dedicated frequency support for public safety bands',
      'Prioritized traffic for emergency services and alarms'
    ],
    resiliencePoints: [
      'Redundant power options for continuous operation during outages',
      'Military-grade encryption for secure surveillance data',
      'Weather-hardened for extreme heat, cold, and moisture'
    ],
    strategicAdvantages: [
      {
        title: 'Total Situational Awareness',
        description: 'Deploy cameras and sensors anywhere without being restricted by fiber or cable availability.'
      },
      {
        title: 'Reduced Infrastructure Cost',
        description: 'Lower municipal costs by eliminating the need for expensive road cutting and fiber repairs.'
      }
    ],
    icon: Shield,
    image: '/assets/surveillance.jpg',
    impactBullets: [
      'Streams high‑definition video with low latency and minimal jitter',
      'Connects distributed cameras without tearing up roads for fiber',
      'Keeps traffic and safety operations online during infrastructure outages',
    ],
  },
  {
    id: slugifyNavLabel('WISP Access Infrastructure'),
    navLabel: 'WISP Access Infrastructure',
    navShortText: 'End-to-end wireless access infrastructure for service providers.',
    pageH1: 'WISP Access Infrastructure',
    headIntro:
      'Scalable access networks for WISPs supporting both PTP and PTMP architectures.',
    overviewExtended:
      'WISPs need infrastructure that scales with their business. Our access solutions are designed for rapid deployment, ease of management, and the ability to serve thousands of customers with high-speed internet.',
    technicalPoints: [
      'High-capacity sector antennas for maximum subscriber density',
      'Carrier-grade QoS and traffic shaping tools',
      'Integrated billing and subscriber management hooks'
    ],
    resiliencePoints: [
      'Lightning and surge protection for tower-mounted equipment',
      'Dynamic frequency selection to avoid interference',
      'Robust hardware built for 10+ years of outdoor service'
    ],
    strategicAdvantages: [
      {
        title: 'Scalable Growth',
        description: 'Start with a single tower and scale to a regional network with modular, compatible hardware.'
      },
      {
        title: 'Competitive Edge',
        description: 'Offer higher speeds and better reliability than traditional satellite or DSL providers.'
      }
    ],
    icon: Signal,
    image: '/assets/wisp-infra.jpg',
    impactBullets: [
      'Shortens time‑to‑revenue for new WISP coverage zones',
      'Reduces churn with stable, predictable subscriber experience',
      'Integrates easily with existing OSS/BSS and core platforms',
    ],
  },
  {
    id: slugifyNavLabel('Outdoor Wireless Backhaul'),
    navLabel: 'Outdoor Wireless Backhaul',
    navShortText: 'Rugged wireless links built for demanding outdoor conditions.',
    pageH1: 'Outdoor Wireless Backhaul',
    headIntro:
      'High throughput backhaul solutions capable of harsh outdoor conditions.',
    overviewExtended:
      'Outdoor backhaul is the spine of any wireless network. Our point-to-point links deliver the massive throughput and rock-solid stability required to connect distant network nodes over challenging terrain.',
    technicalPoints: [
      'Full-duplex throughput for symmetrical data transmission',
      'Precision aiming tools for long-distance alignment',
      'Support for multiple frequency bands to avoid congestion'
    ],
    resiliencePoints: [
      'IP67-rated enclosures for total environmental protection',
      'Advanced error correction for stable links in heavy rain',
      'Remote spectral analysis for proactive troubleshooting'
    ],
    strategicAdvantages: [
      {
        title: 'Terrain Independence',
        description: 'Cross mountains, rivers, and valleys without the astronomical cost of laying physical cable.'
      },
      {
        title: 'High Availability',
        description: 'Achieve 99.99% uptime with links designed for continuous operation in the harshest climates.'
      }
    ],
    icon: Wind,
    image: '/assets/outdoor-backhaul.jpg',
    impactBullets: [
      'Extends core network into non‑fiberable terrain and rights‑of‑way',
      'Provides redundant paths for critical links and data centers',
      'Handles temperature swings, wind loading, and heavy precipitation',
    ],
  },
  {
    id: slugifyNavLabel('Multi-Sector Point-to-Multipoint'),
    navLabel: 'Multi-Sector Point-to-Multipoint',
    navShortText: 'Sector-based PTMP solutions for serving multiple remote sites.',
    pageH1: 'Multi-Sector Point-to-Multipoint Wireless Networks',
    headIntro:
      'Register-based PTMP solutions for connecting multiple remote sites.',
    overviewExtended:
      'Multi-sector deployments maximize tower efficiency. By using advanced beamforming and sectorization, we allow providers to serve a high density of clients from a single location with minimal interference.',
    technicalPoints: [
      '360-degree coverage with multi-sector synchronization',
      'GPS sync for massive frequency reuse across sites',
      'High-performance radio aggregation for total capacity'
    ],
    resiliencePoints: [
      'Sector-level isolation to prevent network-wide outages',
      'Intelligent interference avoidance and channel hopping',
      'Enterprise-grade management for large-scale deployments'
    ],
    strategicAdvantages: [
      {
        title: 'Tower Site Efficiency',
        description: 'Minimize rental costs and equipment footprint by serving more clients from fewer antennas.'
      },
      {
        title: 'Spectrum Optimization',
        description: 'Reuse frequencies more aggressively with synchronized, precision-beam hardware.'
      }
    ],
    icon: Layers,
    image: '/assets/multi-sector.jpg',
    impactBullets: [
      'Serves multiple sectors from a single tower footprint',
      'Optimizes spectrum reuse while maintaining service quality',
      'Ideal for campus, industrial park, and suburban clusters',
    ],
  },
  {
    id: slugifyNavLabel('LAN & Multi-Radio Aggregation'),
    navLabel: 'LAN & Multi-Radio Aggregation',
    navShortText: 'Aggregation platforms for multiple wireless units and LAN segments.',
    pageH1: 'LAN and Multi-Radio Aggregation',
    headIntro:
      'Aggregation solution framework for multi-radio and LAN connectivity.',
    overviewExtended:
      'Modern networks often require the blending of multiple wireless and wired sources. Our aggregation platforms unify these disparate links into a single, high-speed, managed network interface.',
    technicalPoints: [
      'LACP and proprietary link aggregation protocols',
      'Intelligent load balancing across multiple radio links',
      'Seamless integration of fiber, copper, and wireless'
    ],
    resiliencePoints: [
      'Per-link health monitoring with sub-second failover',
      'Redundant hardware power and processing modules',
      'Comprehensive security at the aggregation edge'
    ],
    strategicAdvantages: [
      {
        title: 'Unprecedented Reliability',
        description: 'Combine multiple links so that a failure in one does not interrupt the overall service.'
      },
      {
        title: 'Simplified Management',
        description: 'Control your entire wireless edge from a single, unified management platform.'
      }
    ],
    icon: Server,
    image: '/assets/lan-aggregation.jpg',
    impactBullets: [
      'Aggregates multiple radios into a single managed LAN edge',
      'Simplifies handoff between fixed, mobile, and wireless domains',
      'Provides a central control point for monitoring and security',
    ],
  },
  {
    id: slugifyNavLabel('Managed Wireless Networks'),
    navLabel: 'Managed Wireless Networks',
    navShortText: 'Umbrella category for centralized, enterprise-managed wireless operations.',
    pageH1: 'Managed Wireless Networks',
    headIntro:
      'Enterprise-managed framework unifying access, backhaul, and aggregation.',
    overviewExtended:
      'Enterprise-scale wireless requires more than just hardware; it needs a comprehensive management ecosystem. Our managed network solutions provide the visibility and control necessary for global operations.',
    technicalPoints: [
      'Global network visibility from a single dashboard',
      'Automated provisioning and zero-touch configuration',
      'Deep packet inspection and advanced security policies'
    ],
    resiliencePoints: [
      'Distributed management architecture with no single failure point',
      'Automated backup and disaster recovery for configurations',
      'Continuous security auditing and patch management'
    ],
    strategicAdvantages: [
      {
        title: 'Operational Excellence',
        description: 'Reduce the burden on IT staff with automated network optimization and monitoring.'
      },
      {
        title: 'Data-Driven Insights',
        description: 'Leverage network telemetry to make informed decisions about capacity and growth.'
      }
    ],
    icon: Settings,
    image: '/assets/managed-network.jpg',
    impactBullets: [
      'Centralizes management across access, backhaul, and aggregation',
      'Delivers policy-based control for multi-site enterprises',
      'Supports continuous optimization with telemetry-driven insights',
    ],
  },
];
