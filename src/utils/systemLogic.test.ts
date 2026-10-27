import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterSkills,
  formatLatency,
  calculateSummaryMetrics,
  processTerminalCommand,
} from './systemLogic.ts';
import { SkillCategory } from '../types/portfolio.ts';

test('filterSkills correctly matches query against skill name and category title', () => {
  const sampleCategories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: 'terminal',
      iconColor: 'text-primary',
      skills: [
        { name: 'Java (Java 21)' },
        { name: 'C++' },
        { name: 'SQL (PostgreSQL/MySQL)' },
      ],
    },
    {
      title: 'Cloud & Messaging',
      icon: 'cloud_sync',
      iconColor: 'text-tertiary',
      skills: [
        { name: 'Apache Kafka' },
        { name: 'Amazon SQS' },
      ],
    },
  ];

  const javaResults = filterSkills(sampleCategories, 'Java');
  assert.equal(javaResults.length, 1);
  assert.equal(javaResults[0].title, 'Languages');
  assert.equal(javaResults[0].skills.length, 1);
  assert.equal(javaResults[0].skills[0].name, 'Java (Java 21)');

  const cloudResults = filterSkills(sampleCategories, 'Cloud');
  assert.equal(cloudResults.length, 1);
  assert.equal(cloudResults[0].title, 'Cloud & Messaging');

  const emptyResults = filterSkills(sampleCategories, 'NonExistentFramework');
  assert.equal(emptyResults.length, 0);

  const allResults = filterSkills(sampleCategories, '');
  assert.equal(allResults.length, 2);
});

test('formatLatency clamps and formats properly', () => {
  assert.equal(formatLatency(18.4), 'LATENCY: 18ms (us-east-1)');
  assert.equal(formatLatency(0.2, 'ap-south-1'), 'LATENCY: 1ms (ap-south-1)');
});

test('calculateSummaryMetrics adds problem counts accurately', () => {
  const metrics = calculateSummaryMetrics({
    leetcode: 600,
    codechef: 250,
    codeforces: 150,
  });
  assert.equal(metrics.totalProblems, 1000);
  assert.equal(metrics.isOverThousand, true);
  assert.equal(metrics.displayString, '1,000+');
});

test('processTerminalCommand processes commands deterministically', () => {
  const helpOutput = processTerminalCommand('help');
  assert.ok(helpOutput.response.length > 5);
  assert.ok(helpOutput.response[0].includes('AVAILABLE SYSTEM COMMANDS'));

  const curlOutput = processTerminalCommand('curl resume');
  assert.equal(curlOutput.action, 'open_modal');
  assert.equal(curlOutput.modalId, 'resume-modal');

  const archOutput = processTerminalCommand('arch gitgpt');
  assert.equal(archOutput.action, 'open_modal');
  assert.equal(archOutput.modalId, 'gitgpt-modal');

  const clearOutput = processTerminalCommand('clear');
  assert.equal(clearOutput.action, 'clear');

  const invalidOutput = processTerminalCommand('unknown_xyz');
  assert.ok(invalidOutput.response[0].includes('Command not recognized'));
});
