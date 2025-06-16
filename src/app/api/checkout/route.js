// app/api/checkout/route.js
export async function POST(request) {
  try {
    const body = await request.json();
    const { employeeId } = body;

    if (!employeeId) {
      return Response.json({ error: 'Employee ID is required' }, { status: 400 });
    }

    const checkOutTime = new Date().toISOString();

    // Example: log or save to database
    console.log('Checked out:', { employeeId, checkOutTime });

    return Response.json({ message: 'Check-out successful' });
  } catch (error) {
    console.error('Check-out error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
