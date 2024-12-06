import { ApplicationSettings } from '@nativescript/core';
import type { Inspection, Project } from '../types/inspection';
import { inspectionSchema } from '../validation/schemas';
import { z } from 'zod';

class StorageService {
  private readonly DRAFTS_KEY = 'inspection_drafts';
  private readonly PROJECTS_KEY = 'cached_projects';
  private readonly AUTO_SAVE_KEY = 'inspection_autosave';

  async saveDraft(inspection: Inspection): Promise<void> {
    try {
      // Validate inspection data
      const validatedInspection = inspectionSchema.parse(inspection);
      
      const drafts = this.getDrafts();
      const existingIndex = drafts.findIndex(d => d.id === inspection.id);
      
      if (existingIndex >= 0) {
        drafts[existingIndex] = validatedInspection;
      } else {
        drafts.push(validatedInspection);
      }

      ApplicationSettings.setString(this.DRAFTS_KEY, JSON.stringify(drafts));
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error('Invalid inspection data: ' + error.errors.map(e => e.message).join(', '));
      }
      throw new Error('Failed to save draft: ' + error.message);
    }
  }

  getDrafts(): Inspection[] {
    try {
      const drafts = ApplicationSettings.getString(this.DRAFTS_KEY);
      return drafts ? JSON.parse(drafts) : [];
    } catch (error) {
      console.error('Error reading drafts:', error);
      return [];
    }
  }

  async saveAutoSave(inspection: Partial<Inspection>): Promise<void> {
    try {
      ApplicationSettings.setString(this.AUTO_SAVE_KEY, JSON.stringify(inspection));
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }

  getAutoSave(): Partial<Inspection> | null {
    try {
      const data = ApplicationSettings.getString(this.AUTO_SAVE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading auto-save:', error);
      return null;
    }
  }

  clearAutoSave(): void {
    try {
      ApplicationSettings.remove(this.AUTO_SAVE_KEY);
    } catch (error) {
      console.error('Error clearing auto-save:', error);
    }
  }

  cacheProjects(projects: Project[]): void {
    try {
      ApplicationSettings.setString(this.PROJECTS_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Error caching projects:', error);
    }
  }

  getCachedProjects(): Project[] {
    try {
      const projects = ApplicationSettings.getString(this.PROJECTS_KEY);
      return projects ? JSON.parse(projects) : [];
    } catch (error) {
      console.error('Error reading cached projects:', error);
      return [];
    }
  }
}