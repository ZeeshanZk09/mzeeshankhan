import userService from '@/services/userServices';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Enhanced SearchParams type with all possible query parameters
type SearchParams = {
  q?: string; // search query
  page?: string; // pagination
  limit?: string; // items per page
  sort?: string; // sorting criteria
  fields?: string; // fields to return
  [key: string]: string | undefined; // other possible params
};

// Helper function to get and type the search parameters
const getSearchParams = (request: NextRequest): SearchParams => {
  const { searchParams } = new URL(request.url);
  return Object.fromEntries(searchParams.entries());
};

// Helper function to validate MongoDB ID
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export async function GET(request: NextRequest) {
  try {
    const admin = await userService.requireAdmin(request);
    if (admin instanceof NextResponse) return admin;
    if (!admin) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get all typed search parameters
    const params = getSearchParams(request);
    const { q: query } = params;

    // If no search query, return all users with potential pagination
    if (!query?.trim()) {
      const users = await userService.getAll();
      return NextResponse.json(users);
    }

    const trimmedQuery = query.trim();
    let user = null;

    // Search by ID if valid ObjectId
    if (isValidObjectId(trimmedQuery)) {
      user = await userService.findById(trimmedQuery);
      if (user) return NextResponse.json(user);
    }

    // Search by email if query contains @
    if (trimmedQuery.includes('@')) {
      user = await userService.findByEmail(trimmedQuery);
      if (user) return NextResponse.json(user);
    }

    // Search by username as fallback
    user = await userService.findByUsername(trimmedQuery);
    if (user) return NextResponse.json(user);

    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error) {
    // Handle mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: Object.values(error.errors).map((err) => err.message),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('User API Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
