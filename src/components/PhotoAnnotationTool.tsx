import React, { useState, useRef } from 'react';
import { Stage, Layer, Arrow, Rect, Group } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';

interface Annotation {
  id: string;
  type: 'arrow' | 'rectangle';
  points?: number[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color: string;
}

interface PhotoAnnotationToolProps {
  imageUrl: string;
  existingAnnotations?: Annotation[];
  onSave: (annotations: Annotation[]) => void;
  onClose: () => void;
}

const COLORS = {
  yellow: '#FFD700',
  pink: '#FF69B4',
  red: '#FF0000'
};

export function PhotoAnnotationTool({ imageUrl, existingAnnotations = [], onSave, onClose }: PhotoAnnotationToolProps) {
  const [annotations, setAnnotations] = useState<Annotation[]>(existingAnnotations);
  const [selectedTool, setSelectedTool] = useState<'arrow' | 'rectangle'>('arrow');
  const [selectedColor, setSelectedColor] = useState<keyof typeof COLORS>('red');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const stageRef = useRef<any>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      imageRef.current = image;
      const container = document.getElementById('stage-container');
      if (container) {
        const maxWidth = container.offsetWidth;
        const maxHeight = window.innerHeight * 0.7;
        const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
        setStageSize({
          width: image.width * scale,
          height: image.height * scale
        });
      }
    };

    // Handle window resize
    const handleResize = () => {
      const container = document.getElementById('stage-container');
      if (container && imageRef.current) {
        const maxWidth = container.offsetWidth;
        const maxHeight = window.innerHeight * 0.7;
        const scale = Math.min(maxWidth / imageRef.current.width, maxHeight / imageRef.current.height);
        setStageSize({
          width: imageRef.current.width * scale,
          height: imageRef.current.height * scale
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageUrl]);

  const handleDrawStart = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (pos) {
      setIsDrawing(true);
      setStartPoint(pos);
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        type: selectedTool,
        color: COLORS[selectedColor],
        ...(selectedTool === 'arrow' ? {
          points: [pos.x, pos.y, pos.x, pos.y]
        } : {
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0
        })
      };
      setAnnotations([...annotations, newAnnotation]);
    }
  };

  const handleDrawMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.evt.preventDefault();
    if (!isDrawing || !startPoint) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (pos) {
      const lastAnnotation = annotations[annotations.length - 1];
      if (selectedTool === 'arrow') {
        const newAnnotations = annotations.slice(0, -1);
        newAnnotations.push({
          ...lastAnnotation,
          points: [startPoint.x, startPoint.y, pos.x, pos.y]
        });
        setAnnotations(newAnnotations);
      } else {
        const newAnnotations = annotations.slice(0, -1);
        newAnnotations.push({
          ...lastAnnotation,
          x: Math.min(startPoint.x, pos.x),
          y: Math.min(startPoint.y, pos.y),
          width: Math.abs(pos.x - startPoint.x),
          height: Math.abs(pos.y - startPoint.y)
        });
        setAnnotations(newAnnotations);
      }
    }
  };

  const handleDrawEnd = () => {
    setIsDrawing(false);
    setStartPoint(null);
  };

  const handleUndo = () => {
    setAnnotations(annotations.slice(0, -1));
  };

  const handleSave = () => {
    const stage = stageRef.current;
    if (!stage) return;
    onSave(annotations);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleUndo();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [annotations]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Toolbar */}
      <div className="p-4 bg-gray-800">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedTool('arrow')}
              className={`btn ${selectedTool === 'arrow' ? 'btn-primary' : 'btn-secondary'} py-3 px-6`}
            >
              Arrow
            </button>
            <button
              onClick={() => setSelectedTool('rectangle')}
              className={`btn ${selectedTool === 'rectangle' ? 'btn-primary' : 'btn-secondary'} py-3 px-6`}
            >
              Rectangle
            </button>
          </div>
          
          <div className="flex gap-4">
            {(Object.keys(COLORS) as Array<keyof typeof COLORS>).map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full ${selectedColor === color ? 'ring-4 ring-white' : ''}`}
                style={{ backgroundColor: COLORS[color] }}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button onClick={handleUndo} className="btn btn-secondary">
              Undo (Ctrl+Z)
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              Save
            </button>
            <button onClick={onClose} className="btn btn-secondary">
              Cancel (Esc)
            </button>
          </div>
        </div>
      </div>

      {/* Canvas area */}
      <div 
        id="stage-container"
        className="flex-1 flex items-center justify-center p-4 bg-gray-900 overflow-auto"
      >
        {stageSize.width > 0 && (
          <Stage
            ref={stageRef}
            width={stageSize.width}
            height={stageSize.height}
            onMouseDown={handleDrawStart}
            onMouseMove={handleDrawMove}
            onMouseUp={handleDrawEnd}
            onTouchStart={handleDrawStart}
            onTouchMove={handleDrawMove}
            onTouchEnd={handleDrawEnd}
            className="bg-white shadow-xl"
          >
            <Layer>
              {imageRef.current && (
                <Group>
                  <Rect
                    width={stageSize.width}
                    height={stageSize.height}
                    fill="white"
                  />
                  <Rect
                    width={stageSize.width}
                    height={stageSize.height}
                    fillPatternImage={imageRef.current}
                    fillPatternScaleX={stageSize.width / imageRef.current.width}
                    fillPatternScaleY={stageSize.height / imageRef.current.height}
                  />
                </Group>
              )}
              {annotations.map((annotation) => {
                if (annotation.type === 'arrow' && annotation.points) {
                  return (
                    <Arrow
                      key={annotation.id}
                      points={annotation.points}
                      stroke={annotation.color}
                      strokeWidth={6}
                      pointerLength={15}
                      pointerWidth={15}
                    />
                  );
                } else if (annotation.type === 'rectangle' && annotation.x !== undefined) {
                  return (
                    <Rect
                      key={annotation.id}
                      x={annotation.x}
                      y={annotation.y}
                      width={annotation.width}
                      height={annotation.height}
                      stroke={annotation.color}
                      strokeWidth={4}
                      dash={[10, 10]}
                    />
                  );
                }
                return null;
              })}
            </Layer>
          </Stage>
        )}
      </div>
    </div>
  );
}