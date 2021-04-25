//
//  ReviewsView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/25.
//

import SwiftUI

struct ReviewsView: View {
    @EnvironmentObject var detailsVM: DetailsViewModel
    
    var body: some View {
        VStack(alignment: .leading) {
            Text("Reviews")
                .font(.title2)
                .bold()
                .padding(.top, 10)
                .padding(.bottom, 10)
            
            ForEach(detailsVM.reviews, id: \.id) { review in
                NavigationLink(destination: ReviewDetailsView(media_title: detailsVM.details!.title, review: review)) {
                    VStack(alignment: .leading) {
                        Text("A review by " + review.author)
                            .font(.headline)
                            .bold()
                            .padding(.top, 4)
                            .foregroundColor(Color.black)
                        
                        HStack {
                            Text("Written by" + review.author)
                            if(review.created_at != "") {
                                Text(" on " + review.created_at)
                            }
                            Spacer()
                        }
                        .foregroundColor(.secondary)
                        .padding(.bottom, 4)
                        .padding(.top, 0)
                        
                        HStack {
                            Image(systemName: "star.fill")
                                .foregroundColor(Color.red)
                            Text(String(format: "%.1f", review.rating) + "/5.0")
                                .foregroundColor(Color.black)
                            Spacer()
                        }
                        .padding(.bottom, 4)
                        
                        Text(review.content)
                            .fixedSize(horizontal: false, vertical: true)
                            .lineLimit(3)
                            .font(.body)
                            .foregroundColor(Color.black)
                    }
                    .padding(.leading, 8)
                } // navigation
                .frame(width: 354)
                .padding(.bottom, 10)
                .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(Color.gray))
            } // for each
        }
    }
}

