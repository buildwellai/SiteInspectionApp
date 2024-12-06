import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProjectDetails } from '../types/project';
import { SearchBar } from './SearchBar';
import { ProjectCard } from './ProjectCard';
import debounce from 'lodash.debounce';

interface ProjectListProps {
  projects: ProjectDetails[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredProjects, setFilteredProjects] = React.useState(projects);
  const navigate = useNavigate();

  const handleSearch = React.useMemo(
    () => debounce((query: string) => {
      const lowercaseQuery = query.toLowerCase();
      const filtered = projects.filter(project => 
        project.name.toLowerCase().includes(lowercaseQuery) ||
        project.address.city.toLowerCase().includes(lowercaseQuery) ||
        project.client.name.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredProjects(filtered);
    }, 300),
    [projects]
  );

  React.useEffect(() => {
    handleSearch(searchQuery);
    return () => handleSearch.cancel();
  }, [searchQuery, handleSearch]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search projects..."
        />
      </div>
      
      <div className="p-4">
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => navigate(`/projects/${project.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}