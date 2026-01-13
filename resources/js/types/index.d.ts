import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Project {
    id: number;
    user_id: number;
    name: string;
    description: string | null;
    client_name: string | null;
    client_address: string | null;
    status: 'draft' | 'in_progress' | 'completed' | 'archived';
    frames?: Frame[];
    frames_count?: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

export interface Frame {
    id: number;
    project_id: number;
    frame_type: string;
    opening_type: string | null;
    width: number | null;
    height: number | null;
    surface_area: number | null;
    position_order: number;
    configuration: Record<string, any> | null;
    created_at: string;
    updated_at: string;
}

export interface FramePreset {
    id: number;
    code: string;
    name: string;
    description: string | null;
    icon_path: string | null;
    category: 'imposte' | 'apertura';
    default_config: Record<string, any> | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface FramePresetsByCategory {
    imposte?: FramePreset[];
    apertura?: FramePreset[];
}
