/**
 * Agent Dashboard Page
 *
 * Overview of all agents with statistics, active agents, and quick actions.
 */

import * as React from 'react';

// Mock data (will be real from backend in Task 7)
const mockStats = {
  total: 0,
  available: 0,
  busy: 0,
  offline: 0,
  byType: {
    clawdbot: 0,
    'claude-code': 0,
    custom: 0,
  },
  lastCheckIn: null as string | null,
};

const mockActiveAgents: Array<{
  id: string;
  name: string;
  status: 'available' | 'busy';
  currentTask?: string;
}> = [];

// Mock recent activities
const mockActivities: Array<{
  id: string;
  agentId: string;
  agentName: string;
  action: string;
  timestamp: string;
  timeAgo: string;
}> = [
  {
    id: 'act-1',
    agentId: 'agent-1',
    agentName: 'Clawdbot 1',
    action: 'Checked in as Available',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    timeAgo: '5 minutes ago',
  },
  {
    id: 'act-2',
    agentId: 'agent-2',
    agentName: 'Claude Code 1',
    action: 'Completed task task-123',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    timeAgo: '15 minutes ago',
  },
  {
    id: 'act-3',
    agentId: 'agent-3',
    agentName: 'Custom Agent 1',
    action: 'Updated status to Busy',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    timeAgo: '30 minutes ago',
  },
  {
    id: 'act-4',
    agentId: 'agent-1',
    agentName: 'Clawdbot 1',
    action: 'Checked in as Available',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    timeAgo: '1 hour ago',
  },
  {
    id: 'act-5',
    agentId: 'agent-2',
    agentName: 'Claude Code 1',
    action: 'Completed task task-456',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    timeAgo: '2 hours ago',
  },
];

// Status badge colors
const statusColors: Record<string, string> = {
  available: 'bg-green-100 text-green-700',
  busy: 'bg-yellow-100 text-yellow-700',
};

const statusLabels: Record<string, string> = {
  available: 'Available',
  busy: 'Busy',
};

// Function to format time ago
const formatTimeAgo = (timestamp: string): string => {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / (60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

export default function AgentDashboardPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <div className="border-b border-custom-border-100 px-4 py-3">
        <h1 className="text-xl font-medium text-custom-text-100">
          Agent Dashboard
        </h1>
        <p className="text-sm text-custom-text-400">
          Overview of agent activity and status
        </p>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Statistics Cards */}
          <div>
            <h2 className="text-lg font-medium text-custom-text-200 mb-4">
              Statistics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Agents Card */}
              <div className="bg-white border border-custom-border-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-custom-text-400 mb-2">
                  Total Agents
                </h3>
                <p className="text-3xl font-bold text-custom-text-100">
                  {mockStats.total}
                </p>
              </div>

              {/* Available Card */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-green-700 mb-2">
                  Available
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {mockStats.available}
                </p>
              </div>

              {/* Busy Card */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-yellow-700 mb-2">
                  Busy
                </h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {mockStats.busy}
                </p>
              </div>

              {/* Offline Card */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Offline
                </h3>
                <p className="text-3xl font-bold text-gray-600">
                  {mockStats.offline}
                </p>
              </div>
            </div>

            {/* Agent Type Breakdown */}
            <div className="mt-4 bg-white border border-custom-border-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-base font-medium text-custom-text-200 mb-4">
                Agent Types
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-custom-text-400">Clawdbot</span>
                  <span className="text-xl font-bold text-custom-text-100">
                    {mockStats.byType.clawdbot}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-custom-text-400">Claude Code</span>
                  <span className="text-xl font-bold text-custom-text-100">
                    {mockStats.byType['claude-code']}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-custom-text-400">Custom</span>
                  <span className="text-xl font-bold text-custom-text-100">
                    {mockStats.byType.custom}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Agents List */}
          <div>
            <h2 className="text-lg font-medium text-custom-text-200 mb-4 flex items-center justify-between">
              Active Agents
              {mockActiveAgents.length > 0 && (
                <a
                  href="/agents"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All Agents →
                </a>
              )}
            </h2>

            {mockActiveAgents.length === 0 ? (
              <div className="text-center py-12 bg-white border border-custom-border-200 rounded-lg">
                <p className="text-lg text-custom-text-400">
                  No active agents
                </p>
                <p className="text-sm text-custom-text-400 mt-2">
                  Agents with status "Available" or "Busy" will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {mockActiveAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-white border border-custom-border-200 rounded-lg p-4 shadow-sm flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-medium text-custom-text-100">
                          {agent.name}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[agent.status]}`}>
                          {statusLabels[agent.status]}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-custom-text-400">
                          <span className="font-medium text-custom-text-300">ID:</span> {agent.id}
                        </p>
                        {agent.currentTask && (
                          <p className="text-custom-text-400">
                            <span className="font-medium text-custom-text-300">Task:</span> {agent.currentTask}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-medium text-custom-text-200 mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Check In Button */}
              <a
                href="/check-in"
                className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium"
              >
                Check In
              </a>

              {/* Assign Task Button */}
              <button
                type="button"
                disabled
                className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-base font-medium"
                title="Coming soon"
              >
                Assign Task
              </button>

              {/* View Registry Button */}
              <a
                href="/agents"
                className="flex items-center justify-center px-6 py-4 border border-custom-border-200 rounded-lg hover:bg-custom-background-80 transition-colors text-base font-medium"
              >
                View Registry
              </a>

              {/* View Tasks Button */}
              <a
                href="#"
                className="flex items-center justify-center px-6 py-4 border border-custom-border-200 rounded-lg hover:bg-custom-background-80 transition-colors text-base font-medium"
                title="Link to Plane's tasks page"
              >
                View Tasks
              </a>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-medium text-custom-text-200 mb-4 flex items-center justify-between">
              Recent Activity
              {mockActivities.length > 0 && (
                <span className="text-sm text-custom-text-400">
                  {mockActivities.length} activities
                </span>
              )}
            </h2>

            {mockActivities.length === 0 ? (
              <div className="text-center py-12 bg-white border border-custom-border-200 rounded-lg">
                <p className="text-lg text-custom-text-400">
                  No recent activity
                </p>
                <p className="text-sm text-custom-text-400 mt-2">
                  Agent check-ins and activity will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {mockActivities.slice(0, 10).map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white border border-custom-border-200 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg font-bold">
                        {activity.agentName.charAt(0)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-custom-text-200">
                            {activity.agentName}
                          </span>
                          <span className="text-xs text-custom-text-400">
                            {activity.timeAgo}
                          </span>
                        </div>
                        <p className="text-sm text-custom-text-400">
                          {activity.action}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
