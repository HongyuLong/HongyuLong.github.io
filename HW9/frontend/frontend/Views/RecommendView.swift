//
//  RecommendView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/25.
//

import SwiftUI
import Kingfisher

struct RecommendView: View {
    private var media_type: String
    
    @EnvironmentObject var detailsVM: DetailsViewModel
    
    init(media_type: String) {
        self.media_type = media_type
    }
    
    var body: some View {
        VStack(alignment:.leading) {
            if self.media_type == "movie" {
                Text("Recommended Movies")
                    .font(.title2)
                    .bold()
            }
            else {
                Text("Recommended TV shows")
                    .font(.title2)
                    .bold()
            }
            
            ScrollView(.horizontal) {
                HStack(alignment: .top) {
                    ForEach(detailsVM.recommended, id: \.id) { item in
                        NavigationLink(destination: DetailsView(media_type: self.media_type, media_id: item.id)) {
                            KFImage(URL(string: item.poster_path))
                                .resizable()
                                .frame(width: 96, height: 130)
                                .aspectRatio(contentMode: .fit)
                                .clipped()
                                .cornerRadius(8)
                                .padding(.trailing, 18)
                        }
                    }
                    Spacer()
                }
            }
        }
    }
}

