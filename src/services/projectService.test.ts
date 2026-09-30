import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProjectService } from './projectService';
import { supabase } from './supabaseClient';

vi.mock('./supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn()
    }))
  }
}));

describe('ProjectService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProjects', () => {
    it('should map snake_case to camelCase correctly', async () => {
      const mockData = [
        {
          id: '1',
          title: 'Test',
          description: 'Desc',
          full_description: 'Full Desc',
          category: 'Frontend',
          techs: ['React'],
          github_url: 'http://github.com',
          demo_url: 'http://demo.com',
          image_url: 'http://image.com',
          featured: true,
          visible: true,
          position: 0
        }
      ];

      // Setup the mock chain to return mockData
      const orderMock = vi.fn().mockResolvedValue({ data: mockData, error: null });
      const orderMock2 = vi.fn().mockReturnValue({ order: orderMock });
      const selectMock = vi.fn().mockReturnValue({ order: orderMock2 });
      (supabase.from as any).mockReturnValue({ select: selectMock });

      const result = await ProjectService.getProjects();
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: '1',
        title: 'Test',
        description: 'Desc',
        fullDescription: 'Full Desc',
        category: 'Frontend',
        techs: ['React'],
        githubUrl: 'http://github.com',
        demoUrl: 'http://demo.com',
        imageUrl: 'http://image.com',
        featured: true,
        visible: true,
        position: 0
      });
    });

    it('should throw error on failure', async () => {
      const orderMock = vi.fn().mockResolvedValue({ data: null, error: new Error('DB Error') });
      const orderMock2 = vi.fn().mockReturnValue({ order: orderMock });
      const selectMock = vi.fn().mockReturnValue({ order: orderMock2 });
      (supabase.from as any).mockReturnValue({ select: selectMock });

      await expect(ProjectService.getProjects()).rejects.toThrow('Não foi possível carregar os projetos.');
    });
  });
});
