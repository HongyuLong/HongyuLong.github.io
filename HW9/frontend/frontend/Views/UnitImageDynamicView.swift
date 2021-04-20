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
                .blur(radius: 12)
            
            // not blue image front
            KFImage(URL(string: url))
                .resizable()
                .frame(width: 180, height: 500, alignment: /*@START_MENU_TOKEN@*/.center/*@END_MENU_TOKEN@*/)
                .clipped()
        }
    }
}

