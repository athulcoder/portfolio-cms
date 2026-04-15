'use client';

import React, { useState, useEffect } from 'react';

// --- Types ---
type Skill = {
  id: string;
  name: string;
  level: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
};

type TabId = 'skills' | 'projects';

// --- Icons ---
const IconSkills = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
);

const IconProjects = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
);

const IconTrash = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

const IconPlus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
);

const IconMenu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
);

const IconClose = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
);

// --- UI Components ---
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; className?: string; type?: 'button' | 'submit'; disabled?: boolean }) => {
  const base = "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
    secondary: "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
    danger: "bg-white text-red-600 border border-red-200 hover:bg-red-50 dark:bg-zinc-900 dark:text-red-400 dark:border-red-900/30 dark:hover:bg-red-950/30",
    ghost: "bg-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>}
    <input 
      className={`w-full bg-white dark:bg-zinc-900 border ${error ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-200 dark:border-zinc-800 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10'} rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-[0_1px_2px_rgba(0,0,0,0.02)]`}
      {...props}
    />
    {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
  </div>
);

const Textarea = ({ label, error, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>}
    <textarea 
      className={`w-full bg-white dark:bg-zinc-900 border ${error ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-200 dark:border-zinc-800 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10'} rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-h-[100px] resize-y`}
      {...props}
    />
    {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
  </div>
);

// --- Main App Page ---
export default function PortfolioCMSDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('skills');

  // Load States
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  // -- Data States --
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'React Focus', level: 'Advanced' },
    { id: '2', name: 'Next.js App Router', level: 'Intermediate' },
    { id: '3', name: 'Tailwind CSS', level: 'Advanced' },
    { id: '4', name: 'TypeScript', level: 'Advanced' }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Acme E-Commerce',
      description: 'A high-performance storefront with sub-second page loads. Features dynamic routing and edge caching.',
      techStack: ['Next.js', 'React', 'Tailwind', 'Stripe']
    },
    {
      id: '2',
      title: 'Linear Clone',
      description: 'An issue tracking system with a beautiful neomorphic design and offline-first capabilities.',
      techStack: ['TypeScript', 'Zustand', 'React']
    }
  ]);

  // -- Forms State --
  const [newSkill, setNewSkill] = useState({ name: '', level: '' });
  const [skillError, setSkillError] = useState('');
  
  const [newProject, setNewProject] = useState({ title: '', description: '', techStack: '' });
  const [projectError, setProjectError] = useState({ title: '', description: '', techStack: '' });

  // -- Handlers --
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) {
      setSkillError('Skill name is required');
      return;
    }
    setSkills([...skills, { id: Date.now().toString(), name: newSkill.name.trim(), level: newSkill.level.trim() || 'Unspecified' }]);
    setNewSkill({ name: '', level: '' });
    setSkillError('');
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = { title: '', description: '', techStack: '' };
    let hasError = false;

    if (!newProject.title.trim()) { errors.title = 'Title is required'; hasError = true; }
    if (!newProject.description.trim()) { errors.description = 'Description is required'; hasError = true; }
    if (!newProject.techStack.trim()) { errors.techStack = 'Tech stack is required'; hasError = true; }

    if (hasError) {
      setProjectError(errors);
      return;
    }

    const techArray = newProject.techStack.split(',').map(t => t.trim()).filter(t => t.length > 0);
    
    setProjects([...projects, {
      id: Date.now().toString(),
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      techStack: techArray
    }]);

    setNewProject({ title: '', description: '', techStack: '' });
    setProjectError({ title: '', description: '', techStack: '' });
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  if (!isMounted) return null; // Avoid SSR hydration mismatches

  const NavItem = ({ id, label, icon: Icon }: { id: TabId; label: string; icon: React.FC<{className?:string}> }) => {
    const active = activeTab === id;
    return (
      <button
        onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
          active 
            ? 'bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-zinc-200/60 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700/50' 
            : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/50 border border-transparent'
        }`}
      >
        <Icon className={`w-5 h-5 ${active ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-500'}`} />
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 font-sans flex text-base selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 h-screen w-64 md:w-72 bg-[#fafafa] dark:bg-[#0a0a0a] border-r border-zinc-200/80 dark:border-zinc-800/80 z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-16 flex justify-between items-center px-6 border-b border-zinc-200/80 dark:border-zinc-800/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center shadow-sm">
              <span className="text-white dark:text-zinc-900 font-bold text-lg leading-none">P</span>
            </div>
            <span className="font-semibold tracking-tight text-[15px]">Portfolio CMS</span>
          </div>
          <button className="lg:hidden p-1.5 -mr-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => setIsSidebarOpen(false)}>
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Manage</div>
          <NavItem id="skills" label="Skills" icon={IconSkills} />
          <NavItem id="projects" label="Projects" icon={IconProjects} />
        </nav>
        
        <div className="p-4 border-t border-zinc-200/80 dark:border-zinc-800/80 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center shrink-0 border border-white dark:border-zinc-800 shadow-sm">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">US</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">User Admin</span>
              <span className="text-xs text-zinc-500">admin@portfolio.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen min-w-0 transition-all">
        {/* Header */}
        <header className="h-16 flex items-center px-6 md:px-10 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-md sticky top-0 z-30">
          <button className="lg:hidden p-1.5 -ml-2 mr-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" onClick={() => setIsSidebarOpen(true)}>
            <IconMenu className="w-5 h-5" />
          </button>
          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-[17px] font-semibold tracking-tight capitalize">
              {activeTab} Overview
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-700/50 transition-colors">
                {activeTab === 'skills' ? `${skills.length} Items` : `${projects.length} Items`}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto duration-500">
          
          {/* ---- SKILLS VIEW ---- */}
          {activeTab === 'skills' && (
            <div className="space-y-10">
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">Your Skills</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage and organize your technical proficiencies.</p>
                  </div>
                </div>
                
                {skills.length === 0 ? (
                  <div className="text-center py-16 px-6 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20">
                    <IconSkills className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">No skills added yet</p>
                    <p className="text-sm text-zinc-500 mt-1">Use the form below to add your first skill.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map(skill => (
                      <Card key={skill.id} className="p-5 flex items-start justify-between group">
                        <div className="flex flex-col">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{skill.name}</span>
                          <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 inline-block"></span>
                            {skill.level}
                          </span>
                        </div>
                        <button 
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="opacity-0 group-hover:opacity-100 sm:opacity-100 sm:text-zinc-400 sm:hover:text-red-500 p-2 -mr-2 -mt-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-all focus:opacity-100 focus:outline-none"
                          aria-label="Delete skill"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      </Card>
                    ))}
                  </div>
                )}
              </section>

              <hr className="border-t border-zinc-200 dark:border-zinc-800/80" />

              <section className="max-w-md">
                <h3 className="text-lg font-semibold tracking-tight mb-4">Add New Skill</h3>
                <form onSubmit={handleAddSkill} className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
                  <Input 
                    label="Skill Name" 
                    placeholder="e.g. React.js, UI Design" 
                    value={newSkill.name}
                    onChange={e => { setNewSkill({...newSkill, name: e.target.value}); setSkillError(''); }}
                    error={skillError}
                  />
                  <Input 
                    label="Proficiency Level (Optional)" 
                    placeholder="e.g. Advanced, Beginner" 
                    value={newSkill.level}
                    onChange={e => setNewSkill({...newSkill, level: e.target.value})}
                  />
                  <div className="pt-2">
                    <Button type="submit" className="w-full">
                      <IconPlus className="w-4 h-4" /> Add Skill
                    </Button>
                  </div>
                </form>
              </section>
            </div>
          )}

          {/* ---- PROJECTS VIEW ---- */}
          {activeTab === 'projects' && (
            <div className="space-y-10">
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">Your Projects</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Showcase your best work and case studies.</p>
                  </div>
                </div>

                {projects.length === 0 ? (
                  <div className="text-center py-16 px-6 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20">
                    <IconProjects className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">No projects added yet</p>
                    <p className="text-sm text-zinc-500 mt-1">Use the form below to create your first project showcase.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {projects.map(project => (
                      <Card key={project.id} className="p-6 flex flex-col h-full group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-[17px] text-zinc-900 dark:text-zinc-100 pr-8">{project.title}</h3>
                          <button 
                            onClick={() => handleDeleteProject(project.id)}
                            className="absolute top-5 right-5 sm:opacity-0 group-hover:opacity-100 sm:text-zinc-400 sm:hover:text-red-500 p-2 -mr-2 -mt-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-all focus:opacity-100 focus:outline-none"
                            aria-label="Delete project"
                          >
                            <IconTrash className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 flex-1 pr-6 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.techStack.map(tech => (
                            <span 
                              key={tech} 
                              className="text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-700/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </section>

              <hr className="border-t border-zinc-200 dark:border-zinc-800/80" />

              <section className="max-w-2xl">
                <h3 className="text-lg font-semibold tracking-tight mb-4">Add New Project</h3>
                <form onSubmit={handleAddProject} className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-2xl shadow-sm">
                  <Input 
                    label="Project Title" 
                    placeholder="e.g. E-Commerce Dashboard" 
                    value={newProject.title}
                    onChange={e => { setNewProject({...newProject, title: e.target.value}); setProjectError({...projectError, title: ''}); }}
                    error={projectError.title}
                  />
                  <Textarea 
                    label="Description" 
                    placeholder="Briefly describe the problem and your solution..." 
                    value={newProject.description}
                    onChange={e => { setNewProject({...newProject, description: e.target.value}); setProjectError({...projectError, description: ''}); }}
                    error={projectError.description}
                  />
                  <Input 
                    label="Tech Stack" 
                    placeholder="e.g. Next.js, Tailwind, TypeScript (comma separated)" 
                    value={newProject.techStack}
                    onChange={e => { setNewProject({...newProject, techStack: e.target.value}); setProjectError({...projectError, techStack: ''}); }}
                    error={projectError.techStack}
                  />
                  <div className="pt-4 flex justify-end">
                    <Button type="submit">
                      <IconPlus className="w-4 h-4" /> Save Project
                    </Button>
                  </div>
                </form>
              </section>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}