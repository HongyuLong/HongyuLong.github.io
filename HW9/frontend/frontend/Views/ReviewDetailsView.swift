//
//  ReviewDetailsView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/25.
//

import SwiftUI

struct ReviewDetailsView: View {
    private var media_title: String
    private var review: ReviewItem
    init(media_title: String, review: ReviewItem) {
        self.media_title = media_title
        self.review = review
    }
    
    var body: some View {
        ScrollView(.vertical) {
            VStack(alignment: .leading){
                Text(self.media_title)
                    .font(.title2)
                    .bold()
                    .padding(.bottom, 10)
                
                HStack {
                    Text("Written by" + self.review.author)
                    if(self.review.created_at != "") {
                        Text(" on " + self.review.created_at)
                    }
                    Spacer()
                }
                .foregroundColor(.secondary)
                .padding(.bottom, 4)
                .padding(.top, 0)
                
                HStack {
                    Image(systemName: "star.fill")
                        .foregroundColor(Color.red)
                    Text(String(format: "%.1f", self.review.rating) + "/5.0")
                        .foregroundColor(Color.black)
                    Spacer()
                }
                Divider()
                
                HStack {
                    Text(self.review.content)
                        .font(.body)
                        .fixedSize(horizontal: false, vertical: /*@START_MENU_TOKEN@*/true/*@END_MENU_TOKEN@*/)
                }
                
                Spacer()
            }
            .padding()
        }
    }
}

