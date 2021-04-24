//
//  CarouselView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/21.
//

import SwiftUI

struct CarouselView: View {
    var title: String
    var card_list: [MediaItem]
    var media_type: String
    
    init(card_list: [MediaItem], title: String, media_type:String) {
        self.title = title
        self.card_list = card_list
        self.media_type = media_type
    }
    
    var body: some View {
        
        VStack(alignment: .leading) {
            Text(self.title)
                .font(.title2)
                .bold()
            
            GeometryReader { geometry in
                CarouselDynamic(numberOfImages: self.card_list.count) {
                    ForEach(self.card_list, id: \.id) {item in
                        NavigationLink(destination: DetailsView(media_type: self.media_type, media_id: item.id)) {
                            UnitImageDynamicView(item.poster_path)
                        }
                    }
                }
            }
            .frame(height: 300, alignment: .center)
            .clipped()
        }
    }
}
