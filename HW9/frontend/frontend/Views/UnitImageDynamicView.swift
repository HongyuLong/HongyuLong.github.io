//
//  UnitImageDynamicView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/20.
//

import SwiftUI
import Kingfisher

struct UnitImageDynamicView: View {
    let url: String
    init(_ url: String) {
        self.url = url
    }
    
    var body: some View {
        ZStack {
            // blur image behind
            KFImage(URL(string: url))
                .resizable()
                .frame(width: 358)
                .aspectRatio(contentMode: .fit)
                .blur(radius: 7)
                
            
            // not blue image front
            KFImage(URL(string: url))
                .resizable()
                .frame(width: 200)
                .aspectRatio(contentMode: .fit)

        }
        .frame(width: 358, height: 300)
        .clipped()
    }
}

