//
//  Avatar.swift
//  MobileChallenge
//
//  Created by Ilias Gazdaliev on 03.08.2022.
//

import Foundation
import SwiftUI

struct Avatar: View {
  let initials: String
  init(name: String) {
    self.initials = String(Array(name)[0])
  }
  var body: some View {
    ZStack {
      Circle()
        .fill(Color.green)
        .frame(width: 35, height: 35)
      Text(initials)
        .foregroundColor(.white)
        .fontWeight(.semibold)
    }
  }
}
