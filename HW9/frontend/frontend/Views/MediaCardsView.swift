//
//  MediaCardsView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/20.
//

import SwiftUI
import Kingfisher

struct MediaCardsView: View {
    var title: String
    var card_list: [MediaItem]
    
    init(title: String, card_list: [MediaItem]) {
        self.title = title
        self.card_list = card_list
    }
    var body: some View {
        VStack(alignment: .leading) {
            Text(self.title)
                .font(.title2)
                .bold()
            
            ScrollView(.horizontal) {
                HStack {
                        ForEach(self.card_list, id: \.id) {item in
                            VStack {
                                KFImage(URL(string: item.poster_path))
                                    .resizable()
                                    .frame(width: 80, height: 110)
                                    .aspectRatio(contentMode: .fit)
                                    .clipped()
                                    .cornerRadius(8)
                                Text(item.title)
                                    .font(.headline)
                                    .bold()
                                Text("(" + item.year + ")")
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                            }
                            
                        }
                }
            }
        }
    }
}

