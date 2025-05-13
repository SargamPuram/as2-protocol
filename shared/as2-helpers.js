export function buildAS2Headers(senderId, receiverId) {
    return {
      'Content-Type': 'application/edi-x12',
      'AS2-Version': '1.2',
      'AS2-From': senderId,
      'AS2-To': receiverId,
      'Message-ID': `<${Date.now()}@as2.node>`,
      'Subject': 'Test EDI Message'
    };
  }
  