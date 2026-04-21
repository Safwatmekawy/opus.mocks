export default function handler(req, res) {
  const poNumber = (req.query.po_number || "").toUpperCase().trim();

  // ❌ Validation
  if (!poNumber) {
    return res.status(400).json({
      success: false,
      error: "Missing required parameter: po_number"
    });
  }

  // 🧠 Mock PO Database
  const poDB = {
    "PO22": {
      status: "OPEN",
      total_value: 1500,
      line_items: [
        { item: "Laptop", quantity: 1, unit_price: 1000 },
        { item: "Mouse", quantity: 2, unit_price: 50 },
        { item: "Keyboard", quantity: 1, unit_price: 400 }
      ]
    },
    "PO1002": {
      status: "CLOSED",
      total_value: 800,
      line_items: [
        { item: "Monitor", quantity: 2, unit_price: 400 }
      ]
    }
  };

  const po = poDB[poNumber];

  // ❌ Not found
  if (!po) {
    return res.status(404).json({
      success: false,
      error: "PO not found"
    });
  }

  // ✅ Response
  return res.status(200).json({
    success: true,
    data: {
      po_number: poNumber,
      po_status: po.status,
      total_approved_value: po.total_value,
      approved_line_items: po.line_items
    },
    message: "PO retrieved successfully"
  });
}