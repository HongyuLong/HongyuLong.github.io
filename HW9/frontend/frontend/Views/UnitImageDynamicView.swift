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
                .frame(width: 358, height: 300)
                .aspectRatio(contentMode: .fit)
                .clipped()
                .blur(radius: 10)
                
            
            // not blue image front
            KFImage(URL(string: url))
                .resizable()
                .frame(width: 200, height: 300)
                .aspectRatio(contentMode: .fit)
                .clipped()
        }
        .frame(width: 358, height: 300)
        .clipped()
    }
}

