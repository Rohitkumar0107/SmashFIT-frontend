import React from 'react';
import ActivityItem from '../shared/ActivityItem';

const ActivityFeedWidget = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-lg font-black text-slate-800 mb-4 uppercase tracking-tight">Activity Feed</h2>
      <div className="space-y-5">
        <ActivityItem text="Arjun won against Sid" time="2h ago" />
        <ActivityItem text="New registration: Vikram" time="5h ago" />
        <ActivityItem text="Winter Open started" time="1d ago" />
      </div>
    </div>
  );
};

export default ActivityFeedWidget;