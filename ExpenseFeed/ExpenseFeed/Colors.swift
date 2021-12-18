//
//  Colors.swift
//  ExpenseFeed
//
//  Created by Martin Wiingaard on 16/12/2021.
//

import UIKit

struct Colors {
    static let yellow400 = UIColor(0xfbefaf)
    static let pink300 = UIColor(0xffdee2)
    static let green500 = UIColor(0xace3bd)
    static let purple500 = UIColor(0xa69ae3)
    
    static let primaryColors = [
        Self.yellow400, Self.pink300, Self.green500, Self.purple500
    ]
    
    static func color(for word: String) -> UIColor {
        let colorIndex = Int(word.utf8.first ?? 0) % primaryColors.count
        return primaryColors[colorIndex]
    }
}

private extension UIColor {
    convenience init(red: Int, green: Int, blue: Int) {
        assert(red >= 0 && red <= 255, "Invalid red component")
        assert(green >= 0 && green <= 255, "Invalid green component")
        assert(blue >= 0 && blue <= 255, "Invalid blue component")
        self.init(red: CGFloat(red) / 255.0, green: CGFloat(green) / 255.0, blue: CGFloat(blue) / 255.0, alpha: 1.0)
    }
    
    convenience init(_ hex: Int) {
        self.init(
            red: (hex >> 16) & 0xFF,
            green: (hex >> 8) & 0xFF,
            blue: hex & 0xFF
        )
    }
}
