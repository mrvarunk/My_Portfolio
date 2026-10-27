import { SkillCategory } from '../types/portfolio.ts';

export function filterSkills(categories: SkillCategory[], searchQuery: string): SkillCategory[] {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return categories;

  return categories
    .map(category => {
      const filteredSkills = category.skills.filter(s =>
        s.name.toLowerCase().includes(query) ||
        category.title.toLowerCase().includes(query)
      );
      return {
        ...category,
        skills: filteredSkills,
      };
    })
    .filter(category => category.skills.length > 0);
}

export function formatLatency(latencyMs: number, region = 'us-east-1'): string {
  const clamped = Math.max(1, Math.round(latencyMs));
  return `LATENCY: ${clamped}ms (${region})`;
}

export function calculateSummaryMetrics(problemCounts: { leetcode: number; codechef: number; codeforces: number }) {
  const total = problemCounts.leetcode + problemCounts.codechef + problemCounts.codeforces;
  return {
    totalProblems: total,
    displayString: `${total.toLocaleString()}+`,
    isOverThousand: total >= 1000,
  };
}

export interface TerminalOutput {
  command: string;
  response: string[];
  action?: 'open_modal' | 'copy_email' | 'clear' | 'download_resume';
  modalId?: string;
}

export function processTerminalCommand(rawCommand: string): TerminalOutput {
  const cmd = rawCommand.trim().toLowerCase();
  const parts = cmd.split(/\s+/);
  const primary = parts[0];

  switch (primary) {
    case 'help':
      return {
        command: rawCommand,
        response: [
          'AVAILABLE SYSTEM COMMANDS:',
          '  help             Display this diagnostic reference',
          '  about            Print engineer telemetry & background summary',
          '  projects         Enumerate high-throughput production systems',
          '  skills           List core competencies and toolchains',
          '  stats            Show algorithmic benchmarks & contest ratings',
          '  curl resume      Inspect compiled resume specification',
          '  arch <gitgpt|crawler|microcommerce|cafeops>  Inspect architecture flow',
          '  pgp              Display engineer PGP public key',
          '  ping             Simulate low-latency cluster round-trip',
          '  clear            Flush the console buffer'
        ]
      };

    case 'about':
      return {
        command: rawCommand,
        response: [
          'VARUN K. // DISTRIBUTED SYSTEMS ENGINEER & SYSTEM ARCHITECT',
          'Education: Ramaiah Institute of Technology (MSRIT), ISE Undergrad (8.92 CGPA)',
          'Location: Bengaluru, India',
          'Core Focus: High-concurrency Java 21, Spring Boot, Microservices, RAG, Kafka & Cloud Storage'
        ]
      };

    case 'projects':
      return {
        command: rawCommand,
        response: [
          '[1] GitGPT: Full-Stack RAG Codebase Assistant (Java 21, Spring Boot 3, pgvector, Gemini API)',
          '[2] Distributed Web Crawler & Search Indexer (Java 21 Virtual Threads, AWS SQS, S3, DynamoDB)',
          '[3] MicroCommerce: Event-Driven Microservices (Spring Boot, Apache Kafka, Redis Redisson, K8s)',
          '[4] Cafe Ops: Enterprise Multi-Tenant POS Platform (Spring Boot, Security, PostgreSQL JSONB)'
        ]
      };

    case 'skills':
      return {
        command: rawCommand,
        response: [
          'Languages: Java 21, C++, C, JavaScript, SQL, HTML5/CSS3',
          'Architecture: Spring Boot, Spring Security, Spring Data JPA, Spring AOP, RESTful APIs, React',
          'Cloud & Messaging: Apache Kafka, Amazon SQS, Amazon S3, Docker, Kubernetes, GitHub Actions CI/CD',
          'Storage: PostgreSQL (pgvector), Redis (Pub/Sub & Locks), Amazon DynamoDB, MySQL, MongoDB'
        ]
      };

    case 'stats':
      return {
        command: rawCommand,
        response: [
          'PEAK BENCHMARKS & CONTEST STANDINGS:',
          '  LeetCode: 1879 Peak Rating (Top 4.2% global, Knight Status, 600+ Solves)',
          '  CodeChef: 1604 Max Rating (3★, Div 2 Active, Starters 216 Rank 460)',
          '  Codeforces: 1263 Max Rating (Pupil, Div 2/3 Rounds, 150+ Solves)',
          '  Total Algorithmic Solves: 1,000+ DP, Graphs, Segment Trees & Number Theory'
        ]
      };

    case 'curl':
      if (parts[1] === 'resume') {
        return {
          command: rawCommand,
          response: [
            'HTTP/2 200 OK',
            'Content-Type: application/pdf; name="Varun_K_Resume.pdf"',
            'Opening formatted Resume Inspection Modal...'
          ],
          action: 'open_modal',
          modalId: 'resume-modal'
        };
      }
      return {
        command: rawCommand,
        response: ['Usage: curl resume']
      };

    case 'arch':
      const target = parts[1];
      if (['gitgpt', 'crawler', 'microcommerce', 'cafeops'].includes(target)) {
        return {
          command: rawCommand,
          response: [`Opening architecture pipeline specification for [${target}]...`],
          action: 'open_modal',
          modalId: `${target}-modal`
        };
      }
      return {
        command: rawCommand,
        response: ['Usage: arch <gitgpt|crawler|microcommerce|cafeops>']
      };

    case 'pgp':
      return {
        command: rawCommand,
        response: [
          '-----BEGIN PGP PUBLIC KEY BLOCK-----',
          'Version: OpenPGP.js v5.11.0',
          'Comment: Varun K. Distributed Systems Verification Key',
          'mQGNBGdV7nIBDADXl34G0a7b492c184...Deterministic...',
          'Key ID: 0x4EDE_A3C0 (Algorithm: Ed25519 / RSA-4096)',
          'Fingerprint: B9A2 4C58 1283 490A CEFF C0C1 8083 FF10 4EDE A3C0',
          'UID: Varun K. <varunkudp@gmail.com>',
          'Status: ACTIVE / VERIFIED IDENTITY',
          '-----END PGP PUBLIC KEY BLOCK-----'
        ]
      };

    case 'ping':
      return {
        command: rawCommand,
        response: [
          'PING cluster.us-east-1.aws.internal (10.0.4.12): 56 data bytes',
          '64 bytes from 10.0.4.12: icmp_seq=0 ttl=64 time=18.421 ms',
          '64 bytes from 10.0.4.12: icmp_seq=1 ttl=64 time=17.892 ms',
          '--- cluster ping statistics ---',
          '2 packets transmitted, 2 packets received, 0.0% packet loss',
          'round-trip min/avg/max = 17.892/18.156/18.421 ms'
        ]
      };

    case 'clear':
      return {
        command: rawCommand,
        response: [],
        action: 'clear'
      };

    case '':
      return {
        command: rawCommand,
        response: []
      };

    default:
      return {
        command: rawCommand,
        response: [
          `Command not recognized: '${cmd}'. Type 'help' to inspect system instructions.`
        ]
      };
  }
}
