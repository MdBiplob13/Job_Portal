import mongoose from 'mongoose';
import hostPhoto from "@/utils/hostPhoto/hostPhoto";
import User from '@/app/models/userModel';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

export async function PUT(request) {
  try {
    await connectDB();

    // Get form data
    const formData = await request.formData();
    
    // For now, we'll get email from form data instead of session
    // You can change this later when you add authentication
    const userEmail = formData.get('email');
    
    if (!userEmail) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    // Find user by email from form data
    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Handle file uploads
    const bannerFile = formData.get('banner');
    const photoFile = formData.get('photo');

    let bannerUrl = user.banner;
    let photoUrl = user.photo;

    if (bannerFile && bannerFile.size > 0) {
      bannerUrl = await hostPhoto(bannerFile);
    }

    if (photoFile && photoFile.size > 0) {
      photoUrl = await hostPhoto(photoFile);
    }

    // Extract text fields from form data
    const updateData = {
      name: formData.get('name') || user.name,
      userName: formData.get('userName') || user.userName,
      banner: bannerUrl,
      photo: photoUrl,
      intro: formData.get('intro') || user.intro,
      discretion: formData.get('discretion') || user.discretion,
      location: formData.get('location') || user.location,
      chargeParHour: parseFloat(formData.get('chargeParHour')) || user.chargeParHour,
      phone: formData.get('phone') || user.phone,
      currentJobStatus: formData.get('currentJobStatus') || user.currentJobStatus,
      social: {
        facebook: formData.get('facebook') || user.social?.facebook,
        linkedin: formData.get('linkedin') || user.social?.linkedin,
        instagram: formData.get('instagram') || user.social?.instagram,
        portfolio: formData.get('portfolio') || user.social?.portfolio,
      }
    };

    // Update user in database
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser.toObject();

    return new Response(JSON.stringify({ 
      success: true, 
      user: userWithoutPassword 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Profile update error:", error);
    return new Response(JSON.stringify({ 
      error: "Failed to update profile",
      details: error.message 
    }), {
      status: 500,
    });
  }
}

export async function GET(request) {
  try {
    await connectDB();

    // Get email from query parameters for now
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');
    
    if (!userEmail) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    const user = await User.findOne({ email: userEmail }).select('-password');
    
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Profile fetch error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch profile" }), {
      status: 500,
    });
  }
}