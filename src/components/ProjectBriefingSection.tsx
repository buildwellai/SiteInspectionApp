import React from 'react';

interface ProjectBriefingSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ProjectBriefingSection({ title, children }: ProjectBriefingSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}