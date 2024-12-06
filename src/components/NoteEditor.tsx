import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { reviewInspectionNote } from '../lib/gemini';
import { LoadingSpinner } from './LoadingSpinner';

interface NoteEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  category: 'Defect' | 'Risk' | 'Overview';
  constructionContext?: string;
}

export function NoteEditor({
  value = '', // Provide default value to ensure controlled state
  onChange,
  onSave,
  onCancel,
  category,
  constructionContext
}: NoteEditorProps) {
  const [isReviewing, setIsReviewing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewResult, setReviewResult] = useState<{
    improved: string;
    changes: {
      grammar: string[];
      clarity: string[];
      technical: string[];
    };
  } | null>(null);

  const debouncedReview = useCallback(
    debounce(async (note: string) => {
      if (!note.trim()) return;

      setIsReviewing(true);
      setError(null);
      try {
        const result = await reviewInspectionNote(note, category, constructionContext);
        if (result.improved === note && 
            !result.changes.grammar.length && 
            !result.changes.clarity.length && 
            !result.changes.technical.length) {
          setError('No amendments required. The note appears to be well-written.');
        } else {
          setReviewResult(result);
        }
      } catch (err) {
        setError('Unable to review note at this time. Please try again later.');
        console.error('Note review error:', err);
      } finally {
        setIsReviewing(false);
      }
    }, 500),
    [category, constructionContext]
  );

  const handleReviewNote = () => {
    if (!value.trim()) return;
    debouncedReview(value);
  };

  const applyImprovedNote = () => {
    if (reviewResult) {
      onChange(reviewResult.improved);
      setReviewResult(null);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    setError(null);
    setReviewResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <textarea
          value={value}
          onChange={handleTextChange}
          className="input w-full h-32 resize-none"
          placeholder="Describe what you observe..."
        />
        
        <div className="flex justify-between">
          <button
            onClick={handleReviewNote}
            className="btn btn-secondary text-sm"
            disabled={isReviewing || !value.trim()}
          >
            {isReviewing ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Reviewing...
              </span>
            ) : (
              'Input Assist'
            )}
          </button>
          
          <div className="flex gap-2">
            <button onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button 
              onClick={onSave} 
              className="btn btn-primary"
              disabled={!value.trim()}
            >
              Save
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-gray-600 text-center">{error}</p>
        )}
      </div>

      {reviewResult && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4 animate-fade-in">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Improved Version</h4>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <p className="text-gray-700">{reviewResult.improved}</p>
            </div>
            <button
              onClick={applyImprovedNote}
              className="btn btn-primary mt-2 text-sm"
            >
              Apply Improved Version
            </button>
          </div>

          {(reviewResult.changes.grammar.length > 0 ||
           reviewResult.changes.clarity.length > 0 ||
           reviewResult.changes.technical.length > 0) && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Improvements Made</h4>
              
              {reviewResult.changes.grammar.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Grammar & Style</h5>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {reviewResult.changes.grammar.map((change, i) => (
                      <li key={i}>{change}</li>
                    ))}
                  </ul>
                </div>
              )}

              {reviewResult.changes.clarity.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Clarity & Completeness</h5>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {reviewResult.changes.clarity.map((change, i) => (
                      <li key={i}>{change}</li>
                    ))}
                  </ul>
                </div>
              )}

              {reviewResult.changes.technical.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Technical Accuracy</h5>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {reviewResult.changes.technical.map((change, i) => (
                      <li key={i}>{change}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}