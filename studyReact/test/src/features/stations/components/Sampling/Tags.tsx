import React from 'react';
import { Tag } from 'antd';
import clsx from 'clsx';

export const ActionTag: React.FC<{
    action: 'ON' | 'OFF';
    className?: string;
}> = ({ action, className }) => {
    return (
        <Tag
            color={action === 'ON' ? 'green' : 'red'}
            className={clsx('text-xs font-medium px-2 py-1 rounded', className)}
        >
            {action}
        </Tag>
    );
};

// Custom tag renderer for antd multiple select
export const DayOfWeekTag = (props: any) => {
    const { label, value, closable, onClose } = props;
    return (
        <Tag
            color="blue"
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 4 }}
            className="text-xs font-medium"
        >
            {label || value}
        </Tag>
    );
};
