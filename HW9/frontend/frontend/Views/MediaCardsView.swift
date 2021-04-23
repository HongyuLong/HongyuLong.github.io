//
//  MediaCardsView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/20.
//

import SwiftUI
import Kingfisher

struct MediaCardsView: View {
    private var title: String
    private var card_list: [MediaItem]
    private var media_type: String
    
    init(title: String, card_list: [MediaItem], media_type: String) {
        self.title = title
        self.card_list = card_list
        self.media_type = media_type
    }
    var body: some View {
        VStack(alignment: .leading) {
            Text(self.title)
                .font(.title2)
                .bold()
            
            ScrollView(.horizontal) {
                HStack(alignment: .top) {
                        ForEach(self.card_list, id: \.id) {item in
                            NavigationLink(destination: DetailsView(media_type: self.media_type, media_id: item.id)) {
                                VStack {
                                    KFImage(URL(string: item.poster_path))
                                        .resizable()
                                        .frame(width: 96, height: 130)
                                        .aspectRatio(contentMode: .fit)
                                        .clipped()
                                        .cornerRadius(8)
                                    Text(item.title)
                                        .font(.footnote)
                                        .foregroundColor(.black)
                                        .bold()
                                    Text("(" + item.year + ")")
                                        .font(.footnote)
                                        .foregroundColor(.secondary)
                                        .multilineTextAlignment(.center)
                                }
                                .frame(width: 96)
                                .padding(.trailing, 18)
                            }
                        }
                }
            }
        }
    }
}

