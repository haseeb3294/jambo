// pages/api/generateQRCode.js

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';


export async function POST(request) {
  const { data} = await request.json();
  try {
    // Generate a random file name
    const filename = `${uuidv4()}-${Date.now()}`;

    // Extract base64 data
    const base64Data = data.replace(/^data:image\/png;base64,/, '');

    // Create folder if not exists
    const folderPath = path.join(process.cwd(), 'public', 'qr');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Write QR code image to file
    const filePath = path.join(folderPath, `${filename}.png`);
    fs.writeFileSync(filePath, base64Data, 'base64');

    console.log(`QR code saved successfully at public/qr/${filename}.png`);
    return NextResponse.json({ success: true, filename }, { status: 200 });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json({success: false,error: 'Error generating QR code' }, { status: 500 });
  }
}
