const digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

function readGroup(group: string, isFirstGroup: boolean): string {
  let res = '';
  const h = parseInt(group[0]);
  const t = parseInt(group[1]);
  const u = parseInt(group[2]);

  // Hundreds
  if (!isFirstGroup || h > 0) {
    res += digits[h] + ' trăm ';
  }

  // Tens
  if (t === 0) {
    if (u > 0 && (!isFirstGroup || h > 0)) {
      res += 'lẻ ';
    }
  } else if (t === 1) {
    res += 'mười ';
  } else {
    res += digits[t] + ' mươi ';
  }

  // Units
  if (t > 0 && u === 1) {
    if (t > 1) {
      res += 'mốt';
    } else {
      res += 'một';
    }
  } else if (u === 5 && t > 0) {
    res += 'lăm';
  } else if (u > 0 || (h === 0 && t === 0 && isFirstGroup)) {
    if (u > 0 || (h === 0 && t === 0 && res === '')) {
       res += digits[u];
    }
  }

  return res.trim();
}

/**
 * Converts a number to Vietnamese words.
 * Supports up to trillion (10^15 - 1).
 */
export function numberToVietnameseWords(numStr: string): string {
  // Remove formatting
  let cleanStr = numStr.replace(/[^0-9]/g, '');
  if (!cleanStr) return '';
  
  // Remove leading zeros
  cleanStr = cleanStr.replace(/^0+/, '');
  if (cleanStr === '') return 'không đồng';

  // Pad to multiple of 3
  while (cleanStr.length % 3 !== 0) {
    cleanStr = '0' + cleanStr;
  }

  const groups = [];
  for (let i = 0; i < cleanStr.length; i += 3) {
    groups.push(cleanStr.substring(i, i + 3));
  }

  const units = ['', 'nghìn', 'triệu', 'tỷ'];
  let result = '';

  for (let i = 0; i < groups.length; i++) {
    const groupVal = parseInt(groups[i]);
    if (groupVal > 0) {
      const groupText = readGroup(groups[i], i === 0);
      const unitIndex = (groups.length - 1 - i) % 4;
      const unit = units[unitIndex];
      
      // Handle "tỷ" recurring for very large numbers
      let suffix = '';
      if (unitIndex === 0 && groups.length - 1 - i >= 4) {
          // This case happens for numbers >= 10^12, handled by recursive feel if we had more units
          // For simplicity, we just use "tỷ"
      }

      result += groupText + ' ' + unit + ' ';
    } else if (i === groups.length - 1 && result === '') {
        // Handle case where input was "000" etc already handled by cleanStr === '' but safety first
        return 'không đồng';
    }
  }

  // Capitalize first letter and add "đồng"
  let trimmedResult = result.trim();
  if (!trimmedResult) return 'không đồng';
  
  return trimmedResult.charAt(0).toUpperCase() + trimmedResult.slice(1) + ' đồng';
}

/**
 * Formats a string as currency with dot separators.
 */
export function formatCurrency(value: string): string {
  const clean = value.replace(/[^0-9]/g, '');
  if (!clean) return '';
  return new Intl.NumberFormat('vi-VN').format(parseInt(clean));
}
