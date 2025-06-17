// app/api/checkin/route.js
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, employeeId } = body;

    if (!name || !employeeId) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    const checkInTime = new Date().toISOString();

    // Example: save to DB (placeholder)
    console.log('Checked in:', { name, employeeId, checkInTime });

    return Response.json({ message: 'Check-in successful' });
  } catch (error) {
    console.error('Check-in error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
