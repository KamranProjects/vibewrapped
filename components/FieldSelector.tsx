import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FieldId } from '../types/stats';
import { FIELD_DEFINITIONS } from '../lib/defaults';
import { GripVertical, Eye, EyeOff } from 'lucide-react';

interface SortableItemProps {
  id: FieldId;
  isEnabled: boolean;
  onToggle: (id: FieldId) => void;
  theme: 'light' | 'dark';
}

const SortableItem: React.FC<SortableItemProps> = ({ id, isEnabled, onToggle, theme }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  const field = FIELD_DEFINITIONS[id];
  if (!field) return null;
  
  const isDark = theme === 'dark';

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 12px',
        background: isDark ? '#2a2a2a' : '#ffffff',
        border: `1px solid ${isDark ? '#3a3a3a' : '#e8e4de'}`,
        borderRadius: '10px',
        marginBottom: '8px',
        userSelect: 'none',
      }}
    >
      <div {...attributes} {...listeners} style={{ cursor: 'grab', display: 'flex', color: isDark ? '#555' : '#ccc' }}>
        <GripVertical size={16} />
      </div>

      <div
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDark ? '#333' : '#f5f0eb',
          borderRadius: '8px',
          fontSize: '14px',
          color: isEnabled ? (isDark ? '#d4a96a' : '#c96442') : '#888',
        }}
      >
        {field.icon}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 500, color: isDark ? '#eee' : '#1a1a1a' }}>{field.label}</div>
        <div style={{ fontSize: '11px', color: isDark ? '#888' : '#7a7570' }}>{field.type}</div>
      </div>

      <button
        onClick={() => onToggle(id)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px',
          color: isEnabled ? (isDark ? '#d4a96a' : '#c96442') : '#888',
          display: 'flex',
        }}
      >
        {isEnabled ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );
};

interface FieldSelectorProps {
  fieldOrder: FieldId[];
  hiddenFields: FieldId[];
  onOrderChange: (newOrder: FieldId[]) => void;
  onToggleField: (id: FieldId) => void;
  theme: 'light' | 'dark';
}

export const FieldSelector: React.FC<FieldSelectorProps> = ({
  fieldOrder,
  hiddenFields,
  onOrderChange,
  onToggleField,
  theme,
}) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!mounted) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fieldOrder.indexOf(active.id as FieldId);
      const newIndex = fieldOrder.indexOf(over.id as FieldId);
      onOrderChange(arrayMove(fieldOrder, oldIndex, newIndex));
    }
  };

  const isDark = theme === 'dark';

  return (
    <div style={{ width: '100%' }}>
      <h3
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: isDark ? '#8a8a8a' : '#7a7570',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '16px',
        }}
      >
        Fields & Order
      </h3>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fieldOrder} strategy={verticalListSortingStrategy}>
          {fieldOrder.map(id => (
            <SortableItem
              key={id}
              id={id}
              isEnabled={!hiddenFields.includes(id)}
              onToggle={onToggleField}
              theme={theme}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
