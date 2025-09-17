// pages/api/auth/save-user.js (for Pages Router)
// OR app/api/auth/save-user/route.js (for App Router)

import { adminAuth } from '@/lib/firebase-admin';

// For App Router (Next.js 13+)
export async function POST(request) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ 
        error: 'Unauthorized - No token provided' 
      }, { status: 401 });
    }

    // Extract token
    const token = authHeader.split('Bearer ')[1];
    const { uid, phoneNumber, displayName, email } = await request.json();

    // Verify the Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    if (decodedToken.uid !== uid) {
      return Response.json({ 
        error: 'Token mismatch - Invalid user' 
      }, { status: 403 });
    }

    // Log the user data (you can save to database here)
    console.log('✅ User authenticated successfully:', {
      uid: decodedToken.uid,
      phoneNumber: decodedToken.phone_number || phoneNumber,
      email: decodedToken.email || email,
      displayName: displayName,
      authTime: new Date(decodedToken.auth_time * 1000),
    });

    // Here you would typically save to your database
    // Example with different databases:
    
    // 1. With Prisma:
    // const user = await prisma.user.upsert({
    //   where: { uid },
    //   update: { phoneNumber, displayName, email, lastLogin: new Date() },
    //   create: { uid, phoneNumber, displayName, email, createdAt: new Date() }
    // });

    // 2. With MongoDB:
    // const user = await db.collection('users').updateOne(
    //   { uid },
    //   { $set: { phoneNumber, displayName, email, lastLogin: new Date() }, 
    //     $setOnInsert: { createdAt: new Date() } },
    //   { upsert: true }
    // );

    // 3. With Supabase:
    // const { data, error } = await supabase
    //   .from('users')
    //   .upsert({ uid, phone_number: phoneNumber, display_name: displayName, email });

    // For now, we'll just return success
    const userData = {
      uid: decodedToken.uid,
      phoneNumber: decodedToken.phone_number || phoneNumber,
      email: decodedToken.email || email,
      displayName: displayName,
      verified: true,
      createdAt: new Date().toISOString()
    };

    return Response.json({ 
      success: true, 
      message: 'User authenticated and saved successfully',
      user: userData
    });

  } catch (error) {
    console.error('❌ Error in save-user API:', error);
    
    // Handle specific Firebase errors
    if (error.code === 'auth/id-token-expired') {
      return Response.json({ 
        error: 'Token expired - Please login again' 
      }, { status: 401 });
    }
    
    if (error.code === 'auth/id-token-revoked') {
      return Response.json({ 
        error: 'Token revoked - Please login again' 
      }, { status: 401 });
    }

    return Response.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

// For Pages Router (Next.js 12 and below)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized - No token provided' 
      });
    }

    // Extract token and body data
    const token = authHeader.split('Bearer ')[1];
    const { uid, phoneNumber, displayName, email } = req.body;

    // Verify the Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    if (decodedToken.uid !== uid) {
      return res.status(403).json({ 
        error: 'Token mismatch - Invalid user' 
      });
    }

    // Log the user data
    console.log('✅ User authenticated successfully:', {
      uid: decodedToken.uid,
      phoneNumber: decodedToken.phone_number || phoneNumber,
      email: decodedToken.email || email,
      displayName: displayName,
      authTime: new Date(decodedToken.auth_time * 1000),
    });

    // Database save logic would go here (same as above)
    
    const userData = {
      uid: decodedToken.uid,
      phoneNumber: decodedToken.phone_number || phoneNumber,
      email: decodedToken.email || email,
      displayName: displayName,
      verified: true,
      createdAt: new Date().toISOString()
    };

    res.status(200).json({ 
      success: true, 
      message: 'User authenticated and saved successfully',
      user: userData
    });

  } catch (error) {
    console.error('❌ Error in save-user API:', error);
    
    // Handle specific Firebase errors
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ 
        error: 'Token expired - Please login again' 
      });
    }
    
    if (error.code === 'auth/id-token-revoked') {
      return res.status(401).json({ 
        error: 'Token revoked - Please login again' 
      });
    }

    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}